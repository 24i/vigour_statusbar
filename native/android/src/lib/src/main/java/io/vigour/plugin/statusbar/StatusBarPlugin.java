package io.vigour.plugin.statusbar;

import android.app.Activity;
import android.os.Build;
import android.view.View;
import android.view.WindowManager;

import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 09/04/15.
 */
public class StatusBarPlugin extends Plugin implements View.OnSystemUiVisibilityChangeListener {

    private final Activity context;
    private final View webView;

    public StatusBarPlugin(Activity activity, View webView) {
        super("statusbar");
        this.context = activity;
        this.webView = webView;
        webView.setOnSystemUiVisibilityChangeListener(this);
    }

    public void get() {
    }

    public void set(Object object) {

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
