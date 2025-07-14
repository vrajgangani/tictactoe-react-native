# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Keep AdMob classes
-keep class com.google.android.gms.ads.** { *; }

# Keep Lottie classes
-keep class com.airbnb.lottie.** { *; }

# Keep React Navigation classes
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.gesturehandler.** { *; }

# Keep React Native Blur classes
-keep class com.BV.LinearGradient.** { *; }

# Keep all native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep all classes in the app package
-keep class com.tictactoegame.** { *; }
