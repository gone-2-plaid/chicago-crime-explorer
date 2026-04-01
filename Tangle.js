/* ============================================================
   TANGLE CORE
   ============================================================ */

var Tangle = function (element, model) {
    this.element = element;
    this.model = model;
    this.bindings = [];

    this.initialize();
};

Tangle.prototype = {
    initialize: function () {
        var elements = this.element.querySelectorAll("[data-var]");
        for (var i = 0; i < elements.length; i++) {
            this.initializeElement(elements[i]);
        }
    },

    initializeElement: function (element) {
        var variable = element.getAttribute("data-var");
        var value = this.model.get(variable);

        var className = element.getAttribute("data-class");
        if (className && Tangle.classes[className]) {
            Tangle.classes[className].initialize(
                element,
                this.model,
                value,
                this.getOptions(element)
            );
        } else {
            element.textContent = value;
        }

        this.bindings.push({ element: element, variable: variable });
    },

    getOptions: function (element) {
        var options = {};
        var attrs = element.attributes;
        for (var i = 0; i < attrs.length; i++) {
            var name = attrs[i].name;
            if (name.indexOf("data-") === 0 &&
                name !== "data-var" &&
                name !== "data-class") {
                var key = name.substring(5);
                options[key] = this.parseValue(attrs[i].value);
            }
        }
        return options;
    },

    parseValue: function (value) {
        if (value === "true") return true;
        if (value === "false") return false;
        if (!isNaN(value)) return Number(value);
        return value;
    }
};

Tangle.classes = {};


/* ============================================================
   MODEL
   ============================================================ */

var TangleModel = function (values) {
    this.values = values || {};
    this.observers = [];
};

TangleModel.prototype = {
    get: function (name) {
        return this.values[name];
    },

    set: function (name, value) {
        this.values[name] = value;
        this.notifyObservers();
    },

    addObserver: function (fn) {
        this.observers.push(fn);
    },

    notifyObservers: function () {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i]();
        }
    }
};


/* ============================================================
   TANGLEKIT — TKNumber
   ============================================================ */

var TKNumber = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        model.addObserver(function () {
            element.textContent = model.get(variable);
        });

        element.textContent = value;
    }
};

Tangle.classes.TKNumber = TKNumber;


/* ============================================================
   TANGLEKIT — TKSelect
   ============================================================ */

var TKSelect = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        var select = document.createElement("select");
        element.appendChild(select);

        var opts = options.options ? options.options.split(",") : [];

        for (var i = 0; i < opts.length; i++) {
            var opt = document.createElement("option");
            opt.value = opts[i];
            opt.textContent = opts[i];
            select.appendChild(opt);
        }

        select.value = value;

        select.addEventListener("change", function () {
            model.set(variable, this.value);
        });

        model.addObserver(function () {
            var newValue = model.get(variable);
            if (select.value !== newValue) {
                select.value = newValue;
            }
        });
    }
};

Tangle.classes.TKSelect = TKSelect;


/* ============================================================
   TANGLEKIT — TKSlider
   ============================================================ */

var TKSlider = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        var slider = document.createElement("input");
        slider.type = "range";

        slider.min = options.min;
        slider.max = options.max;
        slider.step = options.step || 1;
        slider.value = value;

        element.appendChild(slider);

        slider.addEventListener("input", function () {
            model.set(variable, Number(this.value));
        });

        model.addObserver(function () {
            var newValue = model.get(variable);
            if (String(newValue) !== slider.value) {
                slider.value = newValue;
            }
        });
    }
};

Tangle.classes.TKSlider = TKSlider;


/* ============================================================
   TANGLEKIT — TKToggle
   ============================================================ */

var TKToggle = {
    initialize: function (element, model, value) {
        var variable = element.getAttribute("data-var");

        element.addEventListener("click", function () {
            model.set(variable, !model.get(variable));
        });

        model.addObserver(function () {
            element.textContent = model.get(variable) ? "On" : "Off";
        });

        element.textContent = value ? "On" : "Off";
    }
};

Tangle.classes.TKToggle = TKToggle;


/* ============================================================
   TANGLEKIT — TKFader
   ============================================================ */

var TKFader = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        var input = document.createElement("input");
        input.type = "range";
        input.min = options.min;
        input.max = options.max;
        input.step = options.step || 1;
        input.value = value;

        element.appendChild(input);

        input.addEventListener("input", function () {
            model.set(variable, Number(this.value));
        });

        model.addObserver(function () {
            input.value = model.get(variable);
        });
    }
};

Tangle.classes.TKFader = TKFader;


/* ============================================================
   TANGLEKIT — TKFormat
   ============================================================ */

var TKFormat = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        model.addObserver(function () {
            var v = model.get(variable);
            element.textContent = TKFormat.format(v, options);
        });

        element.textContent = TKFormat.format(value, options);
    },

    format: function (value, options) {
        if (options.prefix) value = options.prefix + value;
        if (options.suffix) value = value + options.suffix;
        return value;
    }
};

Tangle.classes.TKFormat = TKFormat;


/* ============================================================
   TANGLEKIT — TKLog
   ============================================================ */

var TKLog = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        model.addObserver(function () {
            console.log(variable + " =", model.get(variable));
        });
    }
};

Tangle.classes.TKLog = TKLog;


/* ============================================================
   TANGLEKIT — TKIf
   ============================================================ */

var TKIf = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        model.addObserver(function () {
            element.style.display = model.get(variable) ? "" : "none";
        });

        element.style.display = value ? "" : "none";
    }
};

Tangle.classes.TKIf = TKIf;


/* ============================================================
   TANGLEKIT — TKSwitch
   ============================================================ */

var TKSwitch = {
    initialize: function (element, model, value, options) {
        var variable = element.getAttribute("data-var");

        model.addObserver(function () {
            var v = model.get(variable);
            var children = element.children;

            for (var i = 0; i < children.length; i++) {
                var match = children[i].getAttribute("data-case");
                children[i].style.display = (match === v) ? "" : "none";
            }
        });
    }
};

Tangle.classes.TKSwitch = TKSwitch;
