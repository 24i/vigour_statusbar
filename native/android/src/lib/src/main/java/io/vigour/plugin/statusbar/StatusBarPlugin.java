package io.vigour.plugin.statusbar;

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
public class StatusBarPlugin extends Plugin implements View.OnSystemUiVisibilityChangeListener {

    private final Activity context;
    private final View webView;

    public static final String KEY_COLOR = "background";
    public static final String KEY_VISIBILITY = "visibility";
    public static final String VISIBILITY_TOP = "top";
    public static final String VISIBILITY_HIDDEN = "hidden";
    public static final String VISIBILITY_OVERLAY = "overlay";

    private final SystemBarTintManager tintManager;
    private final Window window;

    public StatusBarPlugin(Activity activity, View webView) {
        super("statusbar");
        this.context = activity;
        this.webView = webView;
        webView.setOnSystemUiVisibilityChangeListener(this);

        window = activity.getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                        WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);

        tintManager = new SystemBarTintManager(activity);
        tintManager.setStatusBarTintEnabled(true);
        tintManager.setNavigationBarTintEnabled(true);
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
        tintManager.setTintColor(color);
    }

    private void setVisibility(Object rawValue) {
        if (!(rawValue instanceof CharSequence)) {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
            throw new IllegalArgumentException(message);
        }
        String value = rawValue.toString();
        if (VISIBILITY_TOP.equalsIgnoreCase(value)) {
            setTop();
        } else if (VISIBILITY_OVERLAY.equalsIgnoreCase(value)) {
            setTop();
        } else if (VISIBILITY_HIDDEN.equalsIgnoreCase(value)){
            setHidden();
        } else {
            String message = String.format("value of %s must be one of [%s, %s, %s]",
                                           KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
            throw new IllegalArgumentException(message);
        }
    }

    public void setHidden() {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT < 16) {
                    context.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE | View.SYSTEM_UI_FLAG_FULLSCREEN);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                    tintManager.setStatusBarTintEnabled(false);
                    tintManager.setNavigationBarTintEnabled(false);
                }
            }
        });
    }

    public void setOverlay() {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT < 16) {
                    context.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
                    window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                    WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                    tintManager.setStatusBarTintEnabled(true);
                    tintManager.setNavigationBarTintEnabled(true);
                }
            }
        });
    }

    public void setTop() {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT < 16) {
                    context.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    webView.setSystemUiVisibility(0);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
                                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                }
                tintManager.setStatusBarTintEnabled(true);
                tintManager.setNavigationBarTintEnabled(true);
            }
        });
    }

    int mLastSystemUiVis;

    @Override
    public void onSystemUiVisibilityChange(int visibility) {
        // Detect when we go out of low-profile mode, to also go out
        // of full screen.  We only do this when the low profile mode
        // is changing from its last state, and turning off.
        int diff = mLastSystemUiVis ^ visibility;
        mLastSystemUiVis = visibility;
        if ((diff&View.SYSTEM_UI_FLAG_LOW_PROFILE) != 0
            && (visibility&View.SYSTEM_UI_FLAG_LOW_PROFILE) == 0) {
            if (!true) {
                webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE | View.SYSTEM_UI_FLAG_FULLSCREEN);
            } else {
                webView.setSystemUiVisibility(0);
            }
        }
    }

}
