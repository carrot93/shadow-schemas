Package.describe({
  name: 'kestanous:validity',
  summary: "A very simple validation pattern aimed at maximum flexibility.",
  version: '0.2.0'
});

Package.on_use(function (api, where) {
    
  api.use('kestanous:shadow-collection');

  api.add_files('lib/validity.js');

  api.export('Validity', ['client', 'server']);
});

Package.on_test(function(api) {

  api.use('validity');
  
  api.use(['tinytest']);

  api.add_files('tests/validity.js');

});
