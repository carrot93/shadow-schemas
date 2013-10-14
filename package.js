Package.describe({
  summary: "A very simple validation pattern aimed at maximum flexibility."
});

Package.on_use(function (api, where) {
  if(api.export) {
    api.use(['coffeescript'], ['client', 'server']);
    api.export('Validity', ['client', 'server']);
  }
  api.add_files('validity.coffee', ['client', 'server']);
});
