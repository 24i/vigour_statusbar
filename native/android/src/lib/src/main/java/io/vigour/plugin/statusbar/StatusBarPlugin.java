package io.vigour.plugin.statusbar;

import android.app.Activity;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;

import java.util.Map;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 09/04/15.
 */
public class StatusBarPlugin extends Plugin implements View.OnSystemUiVisibilityChangeListener {

    private final Activity context;
    private final View webView;

    public static final String KEY_VISIBILITY = "visibility";
    public static final String VISIBILITY_TOP = "top";
    public static final String VISIBILITY_HIDDEN = "hidden";
    public static final String VISIBILITY_OVERLAY = "overlay";

    public StatusBarPlugin(Activity activity, View webView) {
        super("statusbar");
        this.context = activity;
        this.webView = webView;
        webView.setOnSystemUiVisibilityChangeListener(this);
    }

    public String get() {
        return "{}";
    }

    public void set(Object object) {
        Log.i("plugin.set", object.toString());
        if (object instanceof Map) {
            Map<String, Object> args = (Map<String, Object>) object;
            if (args.containsKey(KEY_VISIBILITY)) {
                Object rawValue = args.get(KEY_VISIBILITY);
                if (!(rawValue instanceof CharSequence)) {
                    String message = String.format("value of %s must be one of [%s, %s, %s]",
                                                   KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
                    throw new IllegalArgumentException(message);
                }
                String value = rawValue.toString();
                if (VISIBILITY_TOP.equalsIgnoreCase(value) || VISIBILITY_OVERLAY.equalsIgnoreCase(value)) {
                    show();
                } else if (VISIBILITY_HIDDEN.equalsIgnoreCase(value)){
                    hide();
                } else {
                    String message = String.format("value of %s must be one of [%s, %s, %s]",
                                                   KEY_VISIBILITY, VISIBILITY_HIDDEN, VISIBILITY_OVERLAY, VISIBILITY_TOP);
                    throw new IllegalArgumentException(message);
                }
            }
        }
    }

    public void hide() {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT < 16) {
                    context.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    setNavVisibility(false);
                }
            }
        });
    }

    public void show() {
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Build.VERSION.SDK_INT < 16) {
                    context.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    setNavVisibility(true);
                }
            }
        });
    }

    private void setNavVisibility(boolean visible) {
        if (!visible) {
            webView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE | View.SYSTEM_UI_FLAG_FULLSCREEN);
        } else {
            webView.setSystemUiVisibility(0);
        }
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
            setNavVisibility(true);
        }
    }

}
