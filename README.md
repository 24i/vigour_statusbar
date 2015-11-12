# vigour-status-bar
Allows one to control the native status bar from a web app

## Install
- Add `"plugin": "git+ssh://git@github.com:vigour-io/plugin.git#master"` to the dependencies in [pakage.json](pakage.json)
- Run `npm update plugin`
- *Coming soon*: `npm i vigour-plugin`

## Updates via upstream remote
- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage
See [tests](test)

## Building native apps
See [wrapper](http://github.com/vigour-io/vigour-native)

## API

```
{
  display: "top" | "hidden" | "overlay",
  background: {
    color: <hex code>
    opacity: [0..1]
  },
  text: {
    color: <hex code>
    opacity: [0..1]
  },
}
```

## Notes

### Android

I (@vidbina) spoke with @michielibiza about the way to build Android plugins.
Because we use gradle as a make tool and maven as the repository where
dependencies are looked up, I felt like it made sense to document is somewhere.
My notes can be used to compile decent documentation at some stage.

For `status-bar` it felt sensible to name the Maven plugin
`io.vigour.plugin.status-bar` giving us a separate domain (`io.vigour.plugin`)
for all of our plugins.

This change is executed by editing the `build.gradle` file inside the android
plugin directory `/native/android/statusbar`.

```groovy
apply plugin: 'maven-publish'

buildscript {
    repositories {
        mavenLocal() // adding local maven rep
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.2.3'
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.2'
        classpath 'com.github.dcendents:android-maven-plugin:1.2'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
    }
}

publishing {
    publications {
        maven(MavenPublication) {
            groupId 'io.vigour.plugin' // domain for all vigour plugins
            artifactId 'status-bar' // same name as repository
            version '0.0' // we need to figure out a system to manage this
        }
    }
}
```

As a note I should mention that I named the artifactId `status-bar` because
that corresponds to the repository name. Otherwise Maven seems to adopt the
name of the containing directory which is still named `statusbar`. I'm not in
the mood to start renaming junk until we've established that this setup is
sensible and works as expected under the mantra: build first, cleanup later...
Hope the gods forgive me :pray:.

#### Building

Enter the plugin directory (`/native/android/statusbar`) in order to build the
plugin. Gradle may be used through the wrapper command inside that folder
`./gradlew`. With the proposed changes to the build.gradle file one should be
able to build to a local maven repository somewhere in the `~/.m2/repository`
directory instead of requiring you to push everything online. For development
purposes this could be convenient as it allows us to test things thoroughly
before pushing stuff online where I assume we will mostly have stable builds
instead of all of our development experiments.

[Publish to the local Maven repository](https://docs.gradle.org/current/userguide/publishing_maven.html)
through the following command:

```bash
./gradlew publishToMavenLocal
```

I use `tree -f ~/.m2/repository/status-bar` to find out where inside the
repository Maven chose to install it.

I will proceed to continue editing all other plugins and the plugincore project
in order to ship them to the local Maven repository.
