Package.describe({
  name: 'mreaction:shadow-schemas',
  summary: "A functional schema aimed at maximum flexibility",
  version: '0.1.0'
});

Package.on_use(function (api, where) {
  api.use([
    'matb33:collection-hooks@0.7.5',
    'mreaction:shadow-collections@0.2.0', 
    'underscore', 
    'mreaction:shadow-util@0.1.0'
  ]);
  api.add_files('lib/schema.js');
});