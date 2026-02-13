package io.lifephysics.architect.plugins

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Intent
import android.os.Build
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "WidgetPin")
class WidgetPinPlugin : Plugin() {

    @PluginMethod
    fun pinWidget(call: PluginCall) {
        val widgetType = call.getString("widgetType")

        if (widgetType == null) {
            call.reject("Widget type is required")
            return
        }

        // Check Android version (Requires Oreo 8.0 / API 26)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            call.reject("Widget pinning requires Android 8.0 or higher")
            return
        }

        val appWidgetManager = AppWidgetManager.getInstance(context)

        if (!appWidgetManager.isRequestPinAppWidgetSupported) {
            call.reject("Launcher does not support widget pinning")
            return
        }

        // Mapping widget types to their respective provider classes
        // Note: These classes must exist in the Android project
        val provider = when (widgetType) {
            "status" -> ComponentName(context, "io.lifephysics.architect.widgets.StatusWidget")
            "tasks" -> ComponentName(context, "io.lifephysics.architect.widgets.TasksWidget")
            "quickAdd" -> ComponentName(context, "io.lifephysics.architect.widgets.QuickAddWidget")
            "insight" -> ComponentName(context, "io.lifephysics.architect.widgets.InsightWidget")
            else -> {
                call.reject("Unknown widget type: $widgetType")
                return
            }
        }

        val successCallback = PendingIntent.getActivity(
            context, 0, 
            Intent(context, context.javaClass),
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) 
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE 
            else PendingIntent.FLAG_UPDATE_CURRENT
        )

        val success = appWidgetManager.requestPinAppWidget(provider, null, successCallback)

        if (success) {
            call.resolve()
        } else {
            call.reject("Failed to initiate widget pin request")
        }
    }

    @PluginMethod
    fun canPinWidgets(call: PluginCall) {
        val appWidgetManager = AppWidgetManager.getInstance(context)
        val isSupportedVersion = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
        val isSupportedLauncher = isSupportedVersion && appWidgetManager.isRequestPinAppWidgetSupported

        val ret = JSObject()
        ret.put("canPin", isSupportedLauncher)
        ret.put("reason", if (!isSupportedLauncher) {
            if (!isSupportedVersion) "Android version too old (requires 8.0+)"
            else "Launcher does not support widget pinning"
        } else "Supported")
        
        call.resolve(ret)
    }
}