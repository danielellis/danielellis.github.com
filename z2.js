//
// Data structure for menu items. Each menu item contains up to two properties:
// text data (expected string) and children (optional array of additional menu
// items).
//

var menu = [
    {
        text: "Menu one",
        children: [
            { text: "Menu one, Item one" },
            { text: "Menu one, Item two" },
            { text: "Menu one, Item three" },
            { text: "Menu one, Item four" },
            { text: "Menu one, Item five" }
        ]
    },
    {
        text: "Menu two",
        children: [
            { text: "Menu two, Item one" },
            { text: "Menu two, Item two" },
            { text: "Menu two, Item three" },
            { text: "Menu two, Item four" },
            { text: "Menu two, Item five" }
        ]
    },
    {
        text: "Menu three",
        children: [
            { text: "Menu three, Item one" },
            { text: "Menu three, Item two" },
            { text: "Menu three, Item three" },
            { text: "Menu three, Item four" },
            { text: "Menu three, Item five" }
        ]
    },
    {
        text: "Menu four",
        children: [
            { text: "Menu four, Item one" },
            { text: "Menu four, Item two" },
            { text: "Menu four, Item three" },
            { text: "Menu four, Item four" },
            { text: "Menu four, Item five" }
        ]
    },
    {
        text: "Menu five",
        children: [
            { text: "Menu five, Item one" },
            { text: "Menu five, Item two" },
            { text: "Menu five, Item three" },
            { text: "Menu five, Item four" },
            { text: "Menu five, Item five" }
        ]
    }
];

//
// Helper functions for showing/hiding the menus
//

Element.prototype.show = function() {
    this.style.display = '';
};

Element.prototype.hide = function() {
    this.style.display = 'none';
};

//
// addEventListener helper for IE8 compatibility
//

function eventHelper(object, event, callback) {
    if (object.addEventListener) {
        object.addEventListener(event, callback);
    } else {
        object.attachEvent('on' + event, callback);
    }
}

//
// Function called recursively to build menus of arbitrary depth from data structure above.
//

function buildMenu(container, menuItems, submenu) {
    // Check for valid menuItems array. Immediately return if data is invalid.
    if (!menuItems || !(menuItems instanceof Array)) {
        return;
    }
    var menuContainer, menuItem;
    var i;

    menuContainer = document.createElement('ul');
    menuContainer.className += 'menu-container';
    if (submenu) {
        menuContainer.className += ' submenu';
    }
    menuContainer.hide();

    for (i = 0; i < menuItems.length; i++) {
        // First ensure the object is valid. Otherwise ignore.
        if (typeof menuItems[i] !== 'object' || typeof menuItems[i].text !== 'string') {
            continue;
        }

        menuItem = document.createElement('li');
        menuItem.className += 'menu-item';
        menuItem.appendChild(document.createTextNode(menuItems[i].text));

        // Only parse children if they exist.
        if (menuItems[i].children) {
            buildMenu(menuItem, menuItems[i].children, true);
        }

        menuContainer.appendChild(menuItem);
    }

    // Set up (on)mouseenter and (on)mouseleave listeners, compatible with all target browsers.
    eventHelper(container, 'mouseenter', function() {
        menuContainer.show();
    });
    eventHelper(container, 'mouseleave', function() {
        menuContainer.hide();
    });

    // Finally, append the menu to the DOM.
    container.appendChild(menuContainer);
}

eventHelper(window, 'load', function() {
    buildMenu(document.getElementById('menu-button'), menu);
});
