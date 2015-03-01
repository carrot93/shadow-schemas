Package.describe({
  name: 'shadow:schemas',
  summary: "A very simple validation pattern aimed at maximum flexibility.",
  version: '0.3.0'
});

Package.on_use(function (api, where) {
  
  api.use('matb33:collection-hooks@0.7.9', ['client', 'server'], {weak: true});
  api.use(['shadow:collections@0.1.0', 'underscore', 'shadow:util']);
  api.add_files('lib/schema.js');

});