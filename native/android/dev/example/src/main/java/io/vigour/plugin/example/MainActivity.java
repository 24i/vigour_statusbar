package io.vigour.plugin.example;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import io.vigour.plugin.statusbar.StatusBarPlugin;


public class MainActivity extends ActionBarActivity {

    StatusBarPlugin plugin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        plugin = new StatusBarPlugin(this, findViewById(R.id.screen));
    }

    public void hide(View v) {
        plugin.hide();
    }

    public void show(View v) {
        plugin.show();
    }
}
