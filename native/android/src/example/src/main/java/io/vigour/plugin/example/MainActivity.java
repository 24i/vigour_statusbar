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

    public void red(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#ccff0000"));
    }

    public void blue(View v) {
        plugin.set(makeMap(StatusBarPlugin.KEY_COLOR, "#aa00ff00"));
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
