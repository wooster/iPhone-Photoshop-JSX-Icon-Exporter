
/***********************************************************************

iPhone App Icon Export for iPhone 4/3 Touch and iPad.

Creates all 6 icons sizes that are required for these devices from homescreen, retina display, spotlight search       

1. To use this script, double click the script file, photoshop will launch and ask you for a 512x512 icon file of any image format (jpeg, psd, gif, png etc.)
2. Select the file and photos shop will create 6 icon files and save these with the correct names in the save folder as the 512 image.

3. Add these images into your iPhone project and update you app plist.
Read Apples Q&Q 1686 on how to add this icons to your info plist
http://developer.apple.com/iphone/library/qa/qa2010/qa1686.html

Hope you like this script, hit John Ballinger up on Twitter @sponno on from his website www.bluespark.co.nz

Please keep this Attribution here if you are going to redistrubte this code. Thanks
Creative Commons Attribution 3.0 New Zealand License
http://creativecommons.org/licenses/by/3.0/nz/     

************************************************************************/

//set unit preferences
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;


/////////////////////////////////////////////////////////////////////////////////////////////

//create a new slideshow package
function doResizeAndOutput() {
    // Select Icon file
    var file = File.openDialog("Select your iPhone icon file, this should be 1024 by 1024 for best results, your new icon files will be saved here as well.", /\.(jpe|jpg|jpeg|gif|png|tif|tiff|bmp|psd)/i);
    if (file == null) {
        return; // cancelled.
    }
    app.open(file);  
    var path =  file.absoluteURI.substr(0, file.absoluteURI.lastIndexOf("/") + 1);
    path = path + "/" + "generated"
    var folder = new Folder(path);
    if (!folder.exists) {
        folder.create();
    }
    var resampleMethod = ResampleMethod.BICUBIC;

    // Check document resolution
    if (activeDocument.resolution != 72) {
        activeDocument.resizeImage(null, activeDocument.height, 72, ResampleMethod.BICUBIC);
    }

    var baseWidth = 1024;
    if (activeDocument.width != 1024) {
        baseWidth = 512;
    }

    // Png Save Options
    var pngOptions = new ExportOptionsSaveForWeb;   
    pngOptions.format = SaveDocumentType.PNG  
    pngOptions.PNG8 = true;   
    pngOptions.transparency = false;   
    pngOptions.interlaced = false;   
    pngOptions.quality = 100;  

    // Resize icons from largest to smallest - to preserve quality 
    // on resizing.

    // Icon sizes from:
    // http://mrgan.tumblr.com/post/708404794/ios-app-icon-sizes

    // Here they actually list the files and what order you need
    // to put them in:
    // http://developer.apple.com/iphone/library/qa/qa2010/qa1686.html
    // I don't like their filenames though.

    // Flatten document so layer fx don't scale.
    activeDocument.selection.selectAll();
    activeDocument.selection.copy(true);
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    var mergedDoc = app.documents.add(baseWidth, baseWidth, 72, "Merged Icon", NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1);

    activeDocument.selection.selectAll();
    activeDocument.paste();

    var icons = [
        // iTunes artwork for AdHoc builds.
        {"name": "icon-1024x1024", "size": 1024},
        
        // iPhone 6 Plus @3x
        {"name": "icon-60x60@3x", "size": 180},
        
        // iPad Pro @2x
        {"name": "icon-83.5x83.5@2x", "size": 167},
        
        // iPad and iPad Mini iOS 7 Retina
        {"name": "icon-76x76@2x", "size": 152},
        
        // iPad iOS 5 & 6 Retina
        {"name": "icon-144x144", "size": 144},
        
        // iPhone 4s, iPhone 5, and iPhone 6 at 2x
        {"name": "icon-60x60@2x", "size": 120},
        
        // iPhone 6 Plus Spotlight
        {"name": "icon-40x40@3x", "size": 120},
        
        // iPhone 4 iOS 5 & 6 Retina
        {"name": "icon-114x114", "size": 114},
        
        // iPhone 6 Plus Settings/Spotlight
        {"name": "icon-29x29@3x", "size": 87},
        
        // iPad, iPad Mini, iPhone 4s, iPhone 6, iPhone 5 Spotlight
        {"name": "icon-40x40@2x", "size": 80},
        
        // iPad 2 and iPad mini iOS 7
        {"name": "icon-76x76", "size": 76},
        
        // iPad
        {"name": "icon-72x72", "size": 72},
        
        // iPhone 4 Settings/Spotlight
        {"name": "icon-29x29@2x", "size": 58},
        
        // iPhone iOS 5 & 6
        {"name": "icon-57x57", "size": 57},
        
        // iPhone 2G/3G/3GS
        {"name": "icon", "size": 57},
        
        // iPad Spotlight
        {"name": "icon-50x50", "size": 50},
        
        // iPad 2 and iPad Mini Spotlight
        {"name": "icon-40x40", "size": 40},
        
        // iPhone 2G/3G/3GS Settings/Spotlight, iPad Settings
        {"name": "icon-29x29", "size": 29}
    ];
    
    for (var i = 0; i < icons.length; i++) {
        var eachIcon = icons[i];
        if (eachIcon.size == 50) {
            // 1px around all four edges is trimmed off in software by
            // Apple (weird, right?), so we need to center a 48x48 pixel
            // version of the icon.
            activeDocument.resizeImage(null, 48, 48, resampleMethod);
            activeDocument.resizeCanvas(50, 50, AnchorPosition.MIDDLECENTER);
        } else {
            activeDocument.resizeImage(null, eachIcon.size, eachIcon.size, resampleMethod);
        }
        var file = File(path + "/" + eachIcon.name + ".png");
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, pngOptions);
        if (eachIcon.size == 50) {
            activeDocument.resizeCanvas(48, 48, AnchorPosition.MIDDLECENTER);
        }
    }

    // Close file
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    alert("Done\nAll the new icons have been saved beside your original icons.")

}
//create the slideshow source files
doResizeAndOutput();
