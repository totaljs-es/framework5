require('../../index');
require('../../test');

F.run({ port: 8000, release: false });

var url = 'http://localhost:8000';

ON('ready', function() {

	Test.push('FileStorage - ', function(next) {
		var arr = [];
		var filestorage = FILESTORAGE(CONF.fs);

		// arr.push(function(resume) {
		//RESTBuilder.POST(url + '/upload').file('logo', 'logo.svg', 'https://www.totaljs.com/download/IYsqOb1cr61f.svg').exec(function(err, response) {
		// Test.print('FS - upload', err === null && response ? null : 'Failed to upload file');
		// resume();
		// });
		// });


		arr.push(function(resume) {
			var filename = 'smallfile.txt';
			var id = UID();
			filestorage.save(id, filename, PATH.root(filename), function(err, response) {
				console.log(response);
				Test.print('FS - save - file', err === null && response ? null : 'Failed to save file');
				resume();
			});
		});

		arr.push(function(resume) {
			var filename = 'smallfile.txt';
			var id = UID();

			Total.Fs.readFile(PATH.root(filename), { encode: 'base64' }, function(err, base64) {
				filestorage.save(id, filename, Buffer.from(base64, 'base64'), function(err, response) {
					Test.print('FS - save - base64', err === null && response ? null : 'Failed to save file');
					resume();
				});
			});
		});

		arr.push(function(resume) {
			var filename = 'smallfile.txt';
			var id = UID();

			var stream = Total.Fs.createReadStream(PATH.root(filename));

			filestorage.save(id, filename, stream, function(err, response) {
				Test.print('FS - save - stream', err === null && response ? null : 'Failed to save file');
				resume();
			});
		});
		arr.async(next);
	});

	setTimeout(function() {
		Test.run(function() {
			console.log('DONE');
		});
	}, 5000);
});