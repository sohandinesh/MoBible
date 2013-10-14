// http://stackoverflow.com/questions/6417055/download-files-and-store-them-locally-with-phonegap-jquery-mobile-android-and-io
// Cordova is ready
//
function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, haveFileSystem,
			fail);
}

function haveFileSystem(fileSystem) {
	fileSystem.root.getFile("wordfortheday.mp3", {
		create : true,
		exclusive : false
	}, haveFile, fail);
}

function haveFile(fileEntry) {

	// http://mobible.lk/messages/20130912e.mp3
	// http://mobible.lk/messages/20130912s.mp3
	// http://mobible.lk/messages/20130912t.mp3

	var localPath = fileEntry.fullPath;
	
	if (device.platform === "Android" 
		&& localPath.indexOf("file://") === 0) {
		localPath = localPath.substring(7);
	}

	var fileTransfer = new FileTransfer();
	fileEntry.remove();

	fileTransfer.download("http://mobible.lk/messages/20130912e.mp3", sPath
			+ "theFile.pdf", function(theFile) {
		console.log("download complete: " + theFile.toURI());
		showLink(theFile.toURI());
	}, function(error) {
		console.log("download error source " + error.source);
		console.log("download error target " + error.target);
		console.log("upload error code: " + error.code);
	});
}

function fail(error) {
	console.log(error.code);
}

function downloadFile(downloadURI) {

	var fileTransfer = new FileTransfer();

	fileTransfer.download(
			"http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf", sPath
					+ "theFile.pdf", function(theFile) {
				console.log("download complete: " + theFile.toURI());
				showLink(theFile.toURI());
			}, function(error) {
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code: " + error.code);
			});
}

// function gotFileWriter(writer) {
// writer.onwriteend = function(evt) {
// console.log("contents of file now 'some sample text'");
// writer.truncate(11);
// writer.onwriteend = function(evt) {
// console.log("contents of file now 'some sample'");
// writer.seek(4);
// writer.write(" different text");
// writer.onwriteend = function(evt){
// console.log("contents of file now 'some different text'");
// }
// };
// };
// writer.write("some sample text");
// }

//function downloadFile() {
//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
//			function onFileSystemSuccess(fileSystem) {
//				fileSystem.root.getFile("dummy.html", {
//					create : true,
//					exclusive : false
//				}, function haveFile(fileEntry) {
//
//				}, fail);
//			}, fail);
//};
//}