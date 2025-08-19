#!/bin/bash

# 🎨 RushHour Notification Icon Customization Script
# This script makes it super easy to customize your notification icon colors

echo "🎨 RushHour Notification Icon Customizer"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "android/app/src/main/res/drawable/notification_icon_simple.xml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to show current colors
show_current_colors() {
    echo ""
    echo "🎯 Current Colors:"
    echo "=================="
    
    # Extract background color
    bg_color=$(grep -o 'android:fillColor="#[^"]*"' android/app/src/main/res/drawable/notification_icon_simple.xml | head -1 | sed 's/.*"#\([^"]*\)".*/\1/')
    echo "   Background: #$bg_color"
    
    # Extract icon color
    icon_color=$(grep -o 'android:fillColor="#[^"]*"' android/app/src/main/res/drawable/notification_icon_simple.xml | tail -1 | sed 's/.*"#\([^"]*\)".*/\1/')
    echo "   Icon: #$icon_color"
}

# Function to change colors
change_colors() {
    echo ""
    echo "🎨 Color Change Options:"
    echo "========================"
    echo "1. RushHour Orange (#FF6B35)"
    echo "2. Blue Theme (#2196F3)"
    echo "3. Green Theme (#4CAF50)"
    echo "4. Purple Theme (#9C27B0)"
    echo "5. Dark Theme (#333333)"
    echo "6. Custom Color"
    echo "7. Back to main menu"
    
    read -p "Choose an option (1-7): " choice
    
    case $choice in
        1)
            new_bg="#FF6B35"
            new_icon="#FFFFFF"
            theme_name="RushHour Orange"
            ;;
        2)
            new_bg="#2196F3"
            new_icon="#FFFFFF"
            theme_name="Blue Theme"
            ;;
        3)
            new_bg="#4CAF50"
            new_icon="#FFFFFF"
            theme_name="Green Theme"
            ;;
        4)
            new_bg="#9C27B0"
            new_icon="#FFFFFF"
            theme_name="Purple Theme"
            ;;
        5)
            new_bg="#333333"
            new_icon="#FF6B35"
            theme_name="Dark Theme"
            ;;
        6)
            read -p "Enter background color (e.g., #FF0000): " new_bg
            read -p "Enter icon color (e.g., #FFFFFF): " new_icon
            theme_name="Custom Theme"
            ;;
        7)
            return
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            return
            ;;
    esac
    
    # Validate hex colors
    if [[ ! $new_bg =~ ^#[0-9A-Fa-f]{6}$ ]] || [[ ! $new_icon =~ ^#[0-9A-Fa-f]{6}$ ]]; then
        echo "❌ Invalid color format. Please use hex format (e.g., #FF0000)"
        return
    fi
    
    # Update the icon files
    echo "🔄 Updating notification icons with $theme_name..."
    
    # Update notification_icon_simple.xml
    sed -i '' "s/android:fillColor=\"#[0-9A-Fa-f]\{6\}\"/android:fillColor=\"$new_bg\"/" android/app/src/main/res/drawable/notification_icon_simple.xml
    sed -i '' "s/android:fillColor=\"#[0-9A-Fa-f]\{6\}\"/android:fillColor=\"$new_icon\"/" android/app/src/main/res/drawable/notification_icon_simple.xml
    
    # Update notification_icon_custom.xml
    sed -i '' "s/android:fillColor=\"#[0-9A-Fa-f]\{6\}\"/android:fillColor=\"$new_bg\"/" android/app/src/main/res/drawable/notification_icon_custom.xml
    sed -i '' "s/android:fillColor=\"#[0-9A-Fa-f]\{6\}\"/android:fillColor=\"$new_icon\"/" android/app/src/main/res/drawable/notification_icon_custom.xml
    
    echo "✅ Colors updated successfully!"
    show_current_colors
}

# Function to switch between icon designs
switch_icon_design() {
    echo ""
    echo "🔄 Icon Design Options:"
    echo "======================="
    echo "1. Use Simple Icon (notification_icon_simple.xml)"
    echo "2. Use Custom Icon (notification_icon_custom.xml)"
    echo "3. Back to main menu"
    
    read -p "Choose an option (1-3): " choice
    
    case $choice in
        1)
            icon_name="notification_icon_simple"
            ;;
        2)
            icon_name="notification_icon_custom"
            ;;
        3)
            return
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            return
            ;;
    esac
    
    echo "🔄 Updating app configuration to use $icon_name..."
    
    # Update app.json
    sed -i '' "s/\"icon\": \"@drawable\/[^\"]*\"/\"icon\": \"@drawable\/$icon_name\"/" app.json
    
    # Update AndroidManifest.xml
    sed -i '' "s/android:resource=\"@drawable\/[^\"]*\"/android:resource=\"@drawable\/$icon_name\"/" android/app/src/main/AndroidManifest.xml
    
    echo "✅ Icon design switched to $icon_name!"
    echo "📱 You'll need to rebuild your app to see the changes."
}

# Function to rebuild instructions
show_rebuild_instructions() {
    echo ""
    echo "🔨 Rebuild Instructions:"
    echo "========================"
    echo "After making changes, rebuild your app:"
    echo ""
    echo "1. Clean Android build:"
    echo "   cd android && ./gradlew clean && cd .."
    echo ""
    echo "2. Run on Android:"
    echo "   npx expo run:android"
    echo ""
    echo "3. Test with a notification to see your custom icon!"
}

# Main menu
while true; do
    echo ""
    echo "🎨 Main Menu:"
    echo "============="
    echo "1. Show current colors"
    echo "2. Change icon colors"
    echo "3. Switch icon design"
    echo "4. Show rebuild instructions"
    echo "5. Exit"
    
    read -p "Choose an option (1-5): " main_choice
    
    case $main_choice in
        1)
            show_current_colors
            ;;
        2)
            change_colors
            ;;
        3)
            switch_icon_design
            ;;
        4)
            show_rebuild_instructions
            ;;
        5)
            echo "👋 Happy customizing! Don't forget to rebuild your app."
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            ;;
    esac
done
