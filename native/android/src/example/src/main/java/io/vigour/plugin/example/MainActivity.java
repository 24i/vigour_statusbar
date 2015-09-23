package io.vigour.plugin.example;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import java.util.HashMap;
import java.util.Map;

import io.vigour.plugin.statusbar.StatusBarPlugin;


public class MainActivity extends ActionBarActivity {

    StatusBarPlugin plugin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        plugin = new StatusBarPlugin(this, findViewById(R.id.screen));
    }

    public void hidden(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_VISIBILITY, StatusBarPlugin.VISIBILITY_HIDDEN));
    }

    public void over(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_VISIBILITY, StatusBarPlugin.VISIBILITY_OVERLAY));
    }

    public void top(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_VISIBILITY, StatusBarPlugin.VISIBILITY_TOP));
    }

    public void black(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#000000"));
    }

    public void white(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#ffffff"));
    }

    public void purple(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#5E35B1"));
    }

    public void lime(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#AFB42B"));
    }

    public void alpha0(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_TRANSPARENCY, "0"));
    }

    public void alpha1(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_TRANSPARENCY, "1"));
    }

    public void alpha04(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_TRANSPARENCY, "0.4"));
    }

    private Map<String, Object> makeMap(String... keyvals) {
        if (keyvals.length % 2 != 0) {
            throw new IllegalArgumentException("must have even amount of args");
        }
        HashMap<String, Object> map = new HashMap<>();
        for (int i = 0; i < keyvals.length; i+=2) {
            map.put(keyvals[i], keyvals[i+1]);
        }
        return map;
    }
}
