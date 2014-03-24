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

function buildMenu(container, menuItems, submenu) {
    // Check for valid menuItems array. Immediately return if data is invalid.
    if (!menuItems || !(menuItems instanceof Array)) {
        return;
    }
    var menuContainer, menuItem;
    var i;

    menuContainer = document.createElement('div');
    menuContainer.className += 'menu-container';
    if (submenu) {
        menuContainer.className += ' submenu';
    }
    menuContainer.hide();

    for (i = 0; i < menuItems.length; i++) {
        // First check to make sure the object is valid. Otherwise ignore
        if (typeof menuItems[i] !== 'object'
            || typeof menuItems[i].text !== 'string')
        {
            continue;
        }

        menuItem = document.createElement('div');
        menuItem.className += 'menu-item';
        menuItem.appendChild(document.createTextNode(menuItems[i].text));

        // If children is undefined, then undefined will get passed to the
        // recursive call and handled there.
        buildMenu(menuItem, menuItems[i].children, true);

        menuContainer.appendChild(menuItem);
    }

    // Set up mouseenter and mouseleave listeners, compatible with all target
    // browsers.
    container.addEventListener('mouseenter', function() {
        menuContainer.show();
    });
    container.addEventListener('mouseleave', function() {
        menuContainer.hide();
    });

    // Finally, append the menu to the DOM.
    container.appendChild(menuContainer);
}

buildMenu(document.getElementById('menu-button'), menu);
