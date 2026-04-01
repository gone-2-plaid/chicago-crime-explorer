var myAppData = {
    // Dropdown options (cleaned for filenames)
    crimeGroupOptions: [
        "Drug_Vice",
        "Other",
        "Property",
        "Public Order",
        "Violent",
        "White Collar"
    ],

    locationGroupOptions: [
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
    ],

    // Default values
    crimeGroup: "Drug_Vice",
    locationGroup: "Residential",
    year: 2001,

    // ⭐ REQUIRED: initialize the reactive image variable
    heatmapSrc: ""
};

// --- THIS IS THE KEY CHANGE ---
// Create a TangleModel instance for your data
var myTangleModel = new TangleModel(myAppData);

// Add an observer to update heatmapSrc whenever model values change
myTangleModel.addObserver(function() {
    var filename =
        myTangleModel.get("crimeGroup") + "_" +
        myTangleModel.get("locationGroup") + "_" +
        myTangleModel.get("year") + ".png";
    myTangleModel.set("heatmapSrc", "heatmaps/" + filename);
});

// Initialize the heatmapSrc for the first time
// This needs to be done *after* the model is set up and the observer is added
var initialFilename =
    myTangleModel.get("crimeGroup") + "_" +
    myTangleModel.get("locationGroup") + "_" +
    myTangleModel.get("year") + ".png";
myTangleModel.set("heatmapSrc", "heatmaps/" + initialFilename);


window.onload = function () {
    // Initialize Tangle on the specific #controls div
    // And pass your TangleModel instance
    new Tangle(document.getElementById('controls'), myTangleModel);

    // Also, ensure the img#heatmap has a data-class if you want Tangle to manage its src
    // However, the current Tangle core does not have a TKImg or similar class to set src
    // So, we will manually set it via the TangleModel observer.
    // If you add a Tangle.classes.TKImage, then you could change img#heatmap to:
    // <img id="heatmap" data-var="heatmapSrc" data-class="TKImage" alt="Heatmap will appear here">
    // For now, the observer approach is robust.
    document.getElementById('heatmap').src = myTangleModel.get("heatmapSrc");
};