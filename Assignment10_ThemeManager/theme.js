// Default theme object
const defaultTheme = {
    backgroundColor: "#667eea",
    textColor: "#ffffff",
    buttonBackground: "#764ba2",
    buttonText: "#ffffff"
};

// Current theme object
let currentTheme = { ...defaultTheme };

// Apply theme to the page
function applyTheme(theme) {
    document.body.style.background = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    
    // Update all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.style.backgroundColor = theme.buttonBackground;
        button.style.color = theme.buttonText;
    });
    
    // Update color inputs
    document.getElementById("bgColor").value = theme.backgroundColor;
    document.getElementById("textColor").value = theme.textColor;
    document.getElementById("buttonBgColor").value = theme.buttonBackground;
    document.getElementById("buttonTextColor").value = theme.buttonText;
    
    // Update current theme object
    currentTheme = { ...theme };
    displayThemeObject();
}

// Update theme based on color picker inputs
function updateTheme() {
    const theme = {
        backgroundColor: document.getElementById("bgColor").value,
        textColor: document.getElementById("textColor").value,
        buttonBackground: document.getElementById("buttonBgColor").value,
        buttonText: document.getElementById("buttonTextColor").value
    };
    
    applyTheme(theme);
}

// Apply preset theme
function applyPreset(presetName) {
    if (presetThemes[presetName]) {
        applyTheme(presetThemes[presetName]);
        alert(`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} theme applied!`);
    }
}

// Reset to default theme
function resetTheme() {
    if (confirm("Are you sure you want to reset to the default theme?")) {
        applyTheme(defaultTheme);
        alert("Theme reset to default!");
    }
}

// Save theme to localStorage
function saveTheme() {
    localStorage.setItem("savedTheme", JSON.stringify(currentTheme));
    alert("Theme saved successfully! It will be loaded next time you visit.");
}

// Load saved theme from localStorage
function loadSavedTheme() {
    const savedTheme = localStorage.getItem("savedTheme");
    if (savedTheme) {
        try {
            const theme = JSON.parse(savedTheme);
            applyTheme(theme);
        } catch (e) {
            console.error("Failed to load saved theme:", e);
            applyTheme(defaultTheme);
        }
    } else {
        applyTheme(defaultTheme);
    }
}

// Display current theme object
function displayThemeObject() {
    const themeObjectElement = document.getElementById("themeObject");
    themeObjectElement.textContent = JSON.stringify(currentTheme, null, 2);
}

// Initialize on page load
window.onload = function() {
    loadSavedTheme();
};
