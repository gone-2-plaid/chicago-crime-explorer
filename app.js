var myAppData = {
    // Dropdown options (cleaned for filenames)
    crimeGroupOptions: [
        "Drug_Vice",
        "Other",
        "Property",
        "Public_Order",
        "Violent",
        "White_Collar"
    ],

    locationGroupOptions: [
        "Commercial_Retail",
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

    // Reactive image variable
    heatmapSrc: ""
};

// Create a TangleModel instance
var myTangleModel = new TangleModel(myAppData);

// Update heatmapSrc whenever model values change
myTangleModel.addObserver(function () {
    var filename =
        myTangleModel.get("crimeGroup") + "_" +
        myTangleModel.get("locationGroup") + "_" +
        myTangleModel.get("year") + ".png";

    myTangleModel.set("heatmapSrc", "heatmaps/" + filename);

    // Update the image element
    document.getElementById('heatmap').src = myTangleModel.get("heatmapSrc");
});

// Initialize the heatmapSrc once
var initialFilename =
    myTangleModel.get("crimeGroup") + "_" +
    myTangleModel.get("locationGroup") + "_" +
    myTangleModel.get("year") + ".png";

myTangleModel.set("heatmapSrc", "heatmaps/" + initialFilename);

// Initialize Tangle on page load
window.onload = function () {
    new Tangle(document.getElementById('controls'), myTangleModel);
    document.getElementById('heatmap').src = myTangleModel.get("heatmapSrc");
};
