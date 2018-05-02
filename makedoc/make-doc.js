const fs = require('fs');
const hbs = require('handlebars');
const project = require('./doc.json');

const kinds = {
  Global : 0,
  ExternalModule : 1,
  Module : 2,
  Enum : 4,
  EnumMember : 16,
  Variable : 32,
  Function : 64,
  Class : 128,
  Interface : 256,
  Constructor : 512,
  Property : 1024,
  Method : 2048,
  CallSignature : 4096,
  IndexSignature : 8192,
  ConstructorSignature : 16384,
  Parameter : 32768,
  TypeLiteral : 65536,
  TypeParameter : 131072,
  Accessor : 262144,
  GetSignature : 524288,
  SetSignature : 1048576,
  ObjectLiteral : 2097152,
  TypeAlias : 4194304,
  Event : 8388608,
}

const icon_map = {
  'Accessor' : 'swap_horiz',
  'Class' : 'donut_small',
  'Constructor' : 'build',
  'Interface' : 'donut_large',
  'Enum' : 'format_list_numbered',
  'Method' : 'play_circle_outline',
  'Function' : 'play_circle_filled',
  'Property' : 'radio_button_checked',
  'Inheritance' : 'hdr_strong',
  'Implementation' : 'hdr_strong',
  'Extended' : 'hdr_weak',
  'Implemented' : 'hdr_weak',
  'default' : 'code'
};

/**
* Sidebar helper
*/
hbs.registerHelper('Exported', function(modules, options){
  var sorted_modules = modules.sort((x,y) => (x.name.localeCompare(y.name))).filter((x)=>(x.flags.isExported));
  return options.fn(sorted_modules);
});

/**
* Class helper
*/
hbs.registerHelper('Class', function(modules, options){
  var classes = modules.filter((x) => (x.kind == kinds.Class));
  ret = (classes.length>0)? classes.map((x) => (options.fn(x))).join(""):options.fn(modules);
  return ret;
});

/**
* Interface helper
*/
hbs.registerHelper('Interface', function(modules, options){
  var inters = modules.filter((x) => (x.kind == kinds.Interface));
  ret = (inters.length>0)? inters.map((x) => (options.fn(x))).join(""):options.fn(modules);
  return ret;
});

/**
* Constructor helper
*/
hbs.registerHelper('Constructor', function(modules, options){
  var constr = modules.filter((x) => (x.kind == kinds.Constructor));
  ret = (constr.length>0)? constr.map((x) => (options.fn(x))).join(""):options.inverse(this);
  return ret;
});

/**
* Method helper
*/
hbs.registerHelper('Method', function(modules, options){
  var methods = modules.filter((x) => (x.kind == kinds.Method));
  ret = (methods.length>0)? methods.map((x) => (options.fn(x))).join(""):options.inverse(this);
  return ret;
});

/**
* Accessor Helper
*/
hbs.registerHelper('Accessor', function(modules, options){
  var accessors = modules.filter((x) => (x.kind == kinds.Accessor));
  ret = (accessors.length>0)? accessors.map((x) => (options.fn(x))).join(""):options.inverse(this);
  return ret;
});

/**
* Property Helper
*/
hbs.registerHelper('Property', function(modules, options){
  var properties = modules.filter((x) => (x.kind == kinds.Property));
  ret = (properties.length>0)? properties.map((x) => (options.fn(x))).join(""):options.inverse(this);
  return ret;
});

/**
* Signature Helper
*/
hbs.registerHelper('Signature', function(method, options){
  var signs = method.signatures;
  console.log(method);
  ret = (signs.length>0)? signs.map((x) => (options.fn(x))).join(""):options.inverse(this);
  return ret;
});

/**
* hasMethodsOrAccessors helper
*/
hbs.registerHelper('hasMethodsOrAccessors', function(modules, options){
  var items = modules.filter((x) => ((x.kind==kinds.Method)||(x.kind==kinds.Accessor)));
  if(items.length>0) return options.fn(this);
  else return options.inverse(this);
});

/**
* hasKind helper
*/
hbs.registerHelper('hasKind', function(modules, kind, options){
  var items = modules.filter((x) => (x.kind==kinds[kind]));
  if(items.length>0) return options.fn(this);
  else return options.inverse(this);
});

/**
* Icon helper
*/
hbs.registerHelper('Icon', function(item){
  if(item.kindString in icon_map) return icon_map[item.kindString]
  else return icon_map['default'];

});

/**
* getIcon helper
*/
hbs.registerHelper('getIcon', function(item){
  if(item in icon_map) return icon_map[item]
  else return icon_map['default'];
});

/**
* typeParams helper
*/
hbs.registerHelper('TypeParams', function(item){
  let ret = "";
  if(item.typeParameter && item.typeParameter.length>0) {
    let params = item.typeParameter.map((x)=>(x.name)).join(",");
    ret = "<"+params+">";
  }
  return ret;
});

/**
* Params helper
*/
hbs.registerHelper('Params', function(item){
  let ret = "";
  if(item.parameters && item.parameters.length>0) {
    let params = item.parameters.map((x)=>{
      let r = (x.flags.isRest)?`...${x.name}`:x.name;
      if(x.type.isArray) r = r + "[ ]";
      return r;
    }).join(",");
    ret = params;
  }
  return ret;
});

/**
* Description helper
*/
hbs.registerHelper('Description', function(signature, options){
  if(signature.comment) {
    return options.fn(signature.comment);
  }
  else return options.inverse(this);
});

/**
* Example helper
*/
hbs.registerHelper('Example', function(comment, options){
  if(comment.tags) {
    let examples = comment.tags.filter((x)=>(x.tag=='example'));
    return (examples.length>0)? examples.map((x)=>(options.fn(x))):options.inverse(this);
  }
  else return options.inverse(this);
});

/**
* Inheritance helper
*/
hbs.registerHelper('Inheritance', function(signature, options){
  if(signature.inheritedFrom) {
    return options.fn(signature.inheritedFrom);
  }
  else return options.inverse(this);
});

/**
* Implementation helper
*/
hbs.registerHelper('Implementation', function(signature, options){
  if(signature.implementationOf) {
    return options.fn(signature.implementationOf);
  }
  else return options.inverse(this);
});

/**
* ExtendedTypes helper
*/
hbs.registerHelper('ExtendedTypes', function(item, options){
  if(item.extendedTypes) {
    return options.fn(item.extendedTypes);
  }
  else return options.inverse(this);
});

/**
* ExtendedBy helper
*/
hbs.registerHelper('ExtendedBy', function(item, options){
  if(item.extendedBy) {
    return options.fn(item.extendedBy);
  }
  else return options.inverse(this);
});

/**
* ImplementedTypes helper
*/
hbs.registerHelper('ImplementedTypes', function(item, options){
  if(item.implementedTypes) {
    return options.fn(item.implementedTypes);
  }
  else return options.inverse(this);
});

/**
* ImplementedBy helper
*/
hbs.registerHelper('ImplementedBy', function(item, options){
  if(item.implementedBy) {
    return options.fn(item.implementedBy);
  }
  else return options.inverse(this);
});

/**

*/
fs.readFile("makedoc/pages/template.hbs","utf8", (err, data) => {
  if(err) console.error(err);
  // The HTML template to use for our simple docs
  const tmpl = data;
  // Compile the template with handlebars using our project
  // object as context key
  const result = hbs.compile(tmpl)({ project });

  fs.writeFileSync('docs/index.html', result);
});
