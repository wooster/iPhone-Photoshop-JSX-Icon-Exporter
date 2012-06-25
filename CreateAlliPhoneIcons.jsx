
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
function doResizeAndOutput()
{                              
	
	   	// Select Icon file
		var file = File.openDialog("Select your iPhone icon file, this should be 1024 by 1024 for best results, your new icon files will be saved here as well.", /\.(jpe|jpg|jpeg|gif|png|tif|tiff|bmp|psd)/i);
	    if(file == null) return; // cancelled. 
        app.open(file);  
		var path =  file.absoluteURI.substr(0,file.absoluteURI.lastIndexOf("/")+1);
	    path = path + "/" + "generated"
		var folder = new Folder(path);
		if (!folder.exists) {
			folder.create();
		}
		var resampleMethod = ResampleMethod.BICUBIC;
		
	    // Check document resolution
		if(activeDocument.resolution!=72){
			activeDocument.resizeImage(null,activeDocument.height,72,ResampleMethod.BICUBIC);
		}
		
		var baseWidth = 1024;
		if (activeDocument.width != 1024) {
			baseWidth = 512;
		}
		
		// Png Save Options                                          
		var pngOptions = new PNGSaveOptions();
		pngOptions.interlaced = false;
		
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
		
		// iTunes artwork for AdHoc builds.
		activeDocument.resizeImage(null, baseWidth, baseWidth, resampleMethod);
		activeDocument.saveAs(File(path + "/iTunesArtwork"), pngOptions, true, Extension.NONE);
		
		// iPhone 4
		activeDocument.resizeImage(null,114,114,resampleMethod);  
	   	activeDocument.saveAs(File(path + "/icon-114x114.png"), pngOptions, true);                     
        
        // iPad
	 	activeDocument.resizeImage(null,72,72,resampleMethod);  
		activeDocument.saveAs(File(path + "/icon-72x72.png"), pngOptions, true);

        // iPhone 4 Settings/Spotlight
	 	activeDocument.resizeImage(null,58,58,resampleMethod);  
		activeDocument.saveAs(File(path + "/icon-58x58.png"), pngOptions, true);

        // iPhone 2G/3G/3GS
	 	activeDocument.resizeImage(null,57,57,resampleMethod);  
		activeDocument.saveAs(File(path + "/icon.png"), pngOptions, true);

        // iPad Spotlight
        // 1px around all four edges is trimmed off in software by
        // Apple (weird, right?), so we need to center a 48x48 pixel
        // version of the icon.
	 	activeDocument.resizeImage(null,48,48,resampleMethod);
	 	activeDocument.resizeCanvas(50, 50, AnchorPosition.MIDDLECENTER);
		activeDocument.saveAs(File(path + "/icon-50x50.png"), pngOptions, true);
		activeDocument.resizeCanvas(48, 48, AnchorPosition.MIDDLECENTER);
        
        // iPhone 2G/3G/3GS Settings/Spotlight, iPad Settings
	 	activeDocument.resizeImage(null,29,29,resampleMethod);  
		activeDocument.saveAs(File(path + "/icon-29x29.png"), pngOptions, true);
		
		 // Close file
		activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
        alert("Done\nAll the new icons have been saved beside your original icons.")

}
//create the slideshow source files
doResizeAndOutput();
