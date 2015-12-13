package io.vigour.plugin.statusbar;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.os.Build;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.fasterxml.jackson.jr.ob.JSON;
import com.readystatesoftware.systembartint.SystemBarTintManager;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 09/04/15.
 */
public class StatusBarPlugin extends Plugin {

    private final Activity context;
    private final View webView;

    public static final String KEY_DISPLAY = "display";
    public static final String KEY_BACKGROUND = "background";

    public static final String KEY_COLOR = "color";
    public static final String KEY_TRANSPARENCY = "transparency";

    public static final String DISPLAY_TOP = "top";
    public static final String DISPLAY_HIDDEN = "hidden";
    public static final String DISPLAY_OVERLAY = "overlay";

    private final Window window;
    private String lastColorString = "#000000";
    private Float lastTranparency = 1.f;

    private interface Implementation {
        void setHidden();

        void setTop();

        void setOverlay();

        void setColor(int color);
    }

    private Implementation impementation;

    public void init() {

    }

    public StatusBarPlugin(Activity activity, View webView) {
        super("statusbar");
        this.context = activity;
        this.webView = webView;
        Log.d("webview", webView == null ? "null" : webView.toString());

        window = activity.getWindow();

        if (Build.VERSION.SDK_INT < 16) {
            impementation = new OldImplementation();
        } else if (Build.VERSION.SDK_INT < 19) {
            impementation = new BaseImplementation();
        } else if (Build.VERSION.SDK_INT < 21) {
            impementation = new KitkatImplementation(activity);
        } else {
            impementation = new LollipopImplementation();
        }

        try {
            InputStream stream = activity.getAssets().open("plugin-data/status-bar.json");
            Map<String, Object> initialData = (Map<String, Object>) JSON.std.anyFrom(stream);
            set(initialData);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void set(Map<String, Object> data) {
        display(data.get(KEY_DISPLAY));
        background(data.get(KEY_BACKGROUND));
    }

    @Override
    public String getReadyMessage() {
        try {
            return JSON.std.asString(new StatusBarInfo());
        } catch (IOException e) {
            e.printStackTrace();
            return "error";
        }
    }

    public void text(Object ignored) {

    }

    public void background(Object rawArg) {
        MapWrapper arg = new MapWrapper(rawArg);
        Log.i("background", rawArg.toString());

        String rawColor = arg.getString(KEY_COLOR);
        Float rawTransparency = arg.getFloat(KEY_TRANSPARENCY);
        setColor(rawColor, rawTransparency);
    }

    public void display(Object rawArg) {
        Log.i("display", rawArg.toString());
        setVisibility(rawArg.toString());
    }

    private void setColor(@Nullable String colorString, @Nullable Float transparency) {
        Log.i("statusbar", "set color: " + colorString + " trans: " + transparency);
        if (colorString == null) {
            colorString = lastColorString;
        } else {
            lastColorString = colorString;
        }

        if (transparency == null) {
            transparency = lastTranparency;
        } else {
            lastTranparency = transparency;
        }

        if (colorString.length() > 0 && colorString.charAt(0) != '#') {
            colorString = "#" + colorString;
        }

        int color = Color.parseColor(colorString);
        int alpha  = (int)(transparency * 0xff);
        color = alpha << 24 | (color & 0xffffff);
        impementation.setColor(color);
    }

    private void setVisibility(Object rawValue) {
        if (!(rawValue instanceof CharSequence)) {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_DISPLAY, DISPLAY_HIDDEN, DISPLAY_OVERLAY, DISPLAY_TOP);
            throw new IllegalArgumentException(message);
        }
        String value = rawValue.toString();
        if (DISPLAY_TOP.equalsIgnoreCase(value)) {
            impementation.setTop();
        } else if (DISPLAY_OVERLAY.equalsIgnoreCase(value)) {
            impementation.setOverlay();
        } else if (DISPLAY_HIDDEN.equalsIgnoreCase(value)) {
            impementation.setHidden();
        } else {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_DISPLAY, DISPLAY_HIDDEN, DISPLAY_OVERLAY, DISPLAY_TOP);
            throw new IllegalArgumentException(message);
        }
    }

    private class OldImplementation implements Implementation {
        @Override
        public void setHidden() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    context.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }
            });
        }

        @Override
        public void setTop() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    context.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }
            });
        }

        @Override
        public void setOverlay() {
            throw new UnsupportedOperationException("overlay not supported on sdk " + Build.VERSION.SDK_INT);
        }

        @Override
        public void setColor(int color) {
            throw new UnsupportedOperationException("changing color not supported on sdk " + Build.VERSION.SDK_INT);
        }
    }

    private class BaseImplementation implements Implementation {

        @Override
        public void setHidden() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
//                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE | View.SYSTEM_UI_FLAG_FULLSCREEN);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                    window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                    onSetHidden();
                }
            });
        }

        @Override
        public void setTop() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("webview", webView == null ? "null" : webView.toString());
                    webView.setSystemUiVisibility(0);
//                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
                    window.getDecorView().requestLayout();
                    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION |
                                      WindowManager.LayoutParams.FLAG_FULLSCREEN);
                    onSetTop();
                }
            });
        }

        @Override
        public void setOverlay() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("webview", webView == null ? "null" : webView.toString());
                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
//                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                    window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                    WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                    onSetOverlay();
                }
            });
        }

        protected void onSetHidden() {

        }

        protected void onSetOverlay() {

        }

        protected void onSetTop() {

        }

        @Override
        public void setColor(final int color) {
            throw new UnsupportedOperationException("setcolor not supported on sdk " + Build.VERSION.SDK_INT);
        }
    }

    private class KitkatImplementation extends BaseImplementation {

        private final SystemBarTintManager tintManager;

        public KitkatImplementation(Activity activity) {
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                            WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            tintManager=new SystemBarTintManager(activity);
            tintManager.setStatusBarTintEnabled(true);
            tintManager.setNavigationBarTintEnabled(true);
        }

        @Override
        public void onSetHidden() {
            tintManager.setStatusBarTintEnabled(false);
            tintManager.setNavigationBarTintEnabled(false);
        }

        @Override
        public void onSetTop() {
            tintManager.setStatusBarTintEnabled(true);
            tintManager.setNavigationBarTintEnabled(true);
        }

        @Override
        public void onSetOverlay() {
            tintManager.setStatusBarTintEnabled(true);
            tintManager.setNavigationBarTintEnabled(true);
        }

        @Override
        public void setColor(final int color) {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    tintManager.setTintColor(color);
                }
            });
        }
    }

    private class LollipopImplementation extends BaseImplementation {

        @Override
        public void setOverlay() {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
//                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                }
            });
        }

        @Override
        public void setColor(final int color) {
            context.runOnUiThread(new Runnable() {
                @TargetApi(Build.VERSION_CODES.LOLLIPOP)
                @Override
                public void run() {
                    window.setStatusBarColor(color);
                    window.setNavigationBarColor(color);
                }
            });

        }
    }
}
