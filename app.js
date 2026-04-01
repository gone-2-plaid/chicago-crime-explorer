// Clean a string for filenames: replace spaces and slashes with underscores
function clean(x) {
    return x.replace(/[\/\s]+/g, "_");
}

// Initial model values
var myAppData = {
    crimeGroup: "Drug_Vice",
    locationGroup: "Residential",
    year: 2001,
    heatmapSrc: ""
};

// Create the model
var myTangleModel = new TangleModel(myAppData);

// Update heatmap whenever any variable changes
myTangleModel.addObserver(function () {
    var filename =
        clean(myTangleModel.get("crimeGroup")) + "_" +
        clean(myTangleModel.get("locationGroup")) + "_" +
        myTangleModel.get("year") + ".png";

    myTangleModel.set("heatmapSrc", "heatmaps/" + filename);

    document.getElementById("heatmap").src = myTangleModel.get("heatmapSrc");
});

// Initialize Tangle after page loads
window.onload = function () {
    new Tangle(document.getElementById("controls"), myTangleModel);

    // Set initial heatmap
    var initialFilename =
        clean(myTangleModel.get("crimeGroup")) + "_" +
        clean(myTangleModel.get("locationGroup")) + "_" +
        myTangleModel.get("year") + ".png";

    myTangleModel.set("heatmapSrc", "heatmaps/" + initialFilename);
    document.getElementById("heatmap").src = myTangleModel.get("heatmapSrc");
};
