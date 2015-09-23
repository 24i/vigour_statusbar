package io.vigour.plugin.statusbar;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.readystatesoftware.systembartint.SystemBarTintManager;

import java.util.Map;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 09/04/15.
 */
public class StatusBarPlugin extends Plugin {

    private final Activity context;
    private final View webView;

    public static final String KEY_VISIBILITY = "visibility";
    public static final String KEY_COLOR = "background";
    public static final String KEY_TRANSPARENCY = "transparency";
    public static final String VISIBILITY_TOP = "top";
    public static final String VISIBILITY_HIDDEN = "hidden";
    public static final String VISIBILITY_OVERLAY = "overlay";

    private final Window window;

    private interface Implementation {
        void setHidden();

        void setTop();

        void setOverlay();

        void setColor(int color);
    }

    private Implementation impementation;

    public StatusBarPlugin(Activity activity, View webView) {
        super("statusbar");
        this.context = activity;
        this.webView = webView;

        window = activity.getWindow();

        if (Build.VERSION.SDK_INT < 19) {
            impementation = new OldImplementation();
        } else if (Build.VERSION.SDK_INT < 21) {
            impementation = new KitkatImplementation(activity);
//            impementation = new BaseImplementation();
        } else {
            impementation = new LollipopImplementation();
        }


    }

    public String get() {
        return "{}";
    }

    public void set(Object object) {
        Log.i("plugin.set", object.toString());
        if (!(object instanceof Map)) {
            throw new IllegalArgumentException("value must be an object/map");
        }

        Map<String, String> args = (Map<String, String>) object;
        if (args.containsKey(KEY_VISIBILITY)) {
            Object rawValue = args.get(KEY_VISIBILITY);
            setVisibility(rawValue);
        }

        if (args.containsKey(KEY_COLOR)) {
            Object rawValue = args.get(KEY_COLOR);
            setColor(rawValue);
        }

    }

    private void setColor(Object rawValue) {
        if (!(rawValue instanceof CharSequence)) {
            String message = String.format("value of %s must be a hexcode (like #ffbb00)",
                                           KEY_COLOR);
            throw new IllegalArgumentException(message);
        }
        String value = rawValue.toString();
        int color = Color.parseColor(value);
        impementation.setColor(color);
    }

    private void setVisibility(Object rawValue) {
        if (!(rawValue instanceof CharSequence)) {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
            throw new IllegalArgumentException(message);
        }
        String value = rawValue.toString();
        if (VISIBILITY_TOP.equalsIgnoreCase(value)) {
            impementation.setTop();
        } else if (VISIBILITY_OVERLAY.equalsIgnoreCase(value)) {
            impementation.setOverlay();
        } else if (VISIBILITY_HIDDEN.equalsIgnoreCase(value)) {
            impementation.setHidden();
        } else {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
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
//                    webView.setSystemUiVisibility(0);
                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
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
//                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
                    window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
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
