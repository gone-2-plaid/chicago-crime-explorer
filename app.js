var model = {
    initialize: function () {

        // Dropdown options (cleaned for filenames)
        this.crimeGroupOptions = [
            "Drug_Vice",
            "Other",
            "Property",
            "Public Order",
            "Violent",
            "White Collar"
        ];

        this.locationGroupOptions = [
            "Commercial Retail",
            "Entertainment",
            "Government_Institutional",
            "Industrial_Warehouse",
            "Other_Unknown",
            "Parks_Outdoor",
            "Residential",
            "School_Childcare",
            "Street_Sidewalk",
            "Transit_Vehicle"
        ];

        // Default values
        this.crimeGroup = "Drug_Vice";
        this.locationGroup = "Residential";
        this.year = 2001;

        // ⭐ REQUIRED: initialize the reactive image variable
        this.heatmapSrc = "";
    },

    update: function () {
        var filename =
            this.crimeGroup + "_" +
            this.locationGroup + "_" +
            this.year + ".png";

        this.heatmapSrc = "heatmaps/" + filename;
    }
};

window.onload = function () {
    new Tangle(document.body, model);
};