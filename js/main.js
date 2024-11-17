
$(document).on('click', '.card-header', function() {
  $(this).next('.collapse').collapse('toggle');
});

var number_of_languages;
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("bg-light");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("bg-light");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("bg-light");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (
      file.type === "text/yaml" ||
      file.name.endsWith(".yaml") ||
      file.name.endsWith(".yml")
    ) {
      handleFile(file);
    } else {
      alert("Please drop a YAML file.");
    }
  }
});

dropZone.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (
    file &&
    (file.type === "text/yaml" ||
      file.name.endsWith(".yaml") ||
      file.name.endsWith(".yml"))
  ) {
    handleFile(file);
  } else {
    alert("Please select a YAML file.");
  }
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    // try {
    const yaml = jsyaml.load(event.target.result);
    console.log(yaml);
    validate(yaml);
    // } catch (e) {
    //   alert("Invalid YAML file.");
    // }
  };
  reader.readAsText(file);
}

function validate(dict) {
  required_headings = ["logging", "server", "metadata", "resources"];
  required_headings.forEach((element) => {
    checkIfExist(element, Object.keys(dict));
  });

  if (checkIfExist("server", Object.keys(dict))) {
    fillServer(dict.server);
  }
  if (checkIfExist("logging", Object.keys(dict))) {
    fillLogging(dict.logging);
  }
  if (checkIfExist("metadata", Object.keys(dict))) {
    fillMetadata(dict.metadata);
  }
  if (checkIfExist("resources", Object.keys(dict))) {
    fillResources(dict.resources);
  }
}

function checkIfExist(string, checkIn) {
  if (!checkIn.includes(string)) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: `${string} is not part of configuration`,
      showConfirmButton: false,
      timer: 1500,
    });
    return false;
  }
  return true;
}

function checkInput(id, value) {}
function fillServer(server) {
  if (server.bind.host) {
    $("#server_host").val(server.bind.host);
  }
  if (server.bind.port) {
    $("#server_port").val(server.bind.port);
  }
  if (server.url) {
    $("#server_url").val(server.url);
  }
  if (server.gzip) {
    $("#server_gzip").prop("checked", server.gzip);
  }
  if (server.pretty_print) {
    $("#server_pretty_print").prop("checked", server.pretty_print);
  }
  if (server.cors) {
    $("#server_cors").prop("checked", server.cors);
  }
  if (server.admin) {
    $("#server_admin").prop("checked", server.admin);
  }
  if (server.mimetype) {
    $("#server_mimetype").val(server.mimetype);
  }
  if (server.encoding) {
    $("#server_encoding").val(server.encoding);
  }
  if (server.limit) {
    $("#server_limit").val(server.limit);
  }
  if (server.map.url) {
    $("#server_map_url").val(server.map.url);
  }
  if (server.map.attribution) {
    $("#server_map_attribution").val(server.map.attribution);
  }
  if (server.languages) {
    $("#server_languages").val(server.languages);
  }
}

function updateServer(finalJSON) {
  if ($("#server_host").val()) {
    finalJSON['server']['bind']['host'] = $("#server_host").val()
  }
  if ($("#server_port").val()) {
    finalJSON['server']['bind']['port'] = $("#server_port").val()
  }
  if ($("#server_url").val()) {
    finalJSON['server']['url'] = $("#server_url").val()
  }
  if ($("#server_languages").val()) {
    finalJSON['server']['languages'] = $("#server_languages").val()
  }
  if ($("#server_mimetype").val()) {
    finalJSON['server']['mimetype'] = $("#server_mimetype").val()
  }
  if ($("#server_gzip").val()) {
    finalJSON['server']['gzip'] = $("#server_gzip").prop('checked')
  }
  if ($("#server_pretty_print").val()) {
    finalJSON['server']['pretty_print'] = $("#server_pretty_print").prop('checked')
  }
 
  if ($("#server_cors").val()) {
    finalJSON['server']['cors'] = $("#server_cors").prop('checked')
  }
  if ($("#server_admin").val()) {
    finalJSON['server']['admin'] = $("#server_admin").prop('checked')
  }
  if ($("#server_encoding").val()) {
    finalJSON['server']['encoding'] = $("#server_encoding").val()
  }
  if ($("#server_limit").val()) {
    finalJSON['server']['limit'] = $("#server_limit").val()
  }
 
  if ($("#server_map_url").val()) {
    finalJSON['server']['map']['url'] = $("#server_map_url").val()
  }
  if ($("#server_map_attribution").val()) {
    finalJSON['server']['map']['attribution'] = $("#server_map_attribution").val()
  }

  return finalJSON

}

function updateLogging(finalJSON) {
  if ($("#logging_level").val()) {
    finalJSON['logging']['level'] = $("#logging_level").val()
  }
  if ($("#logging_logfile").val()) {
    finalJSON['logging']['logfile'] = $("#logging_logfile").val()
  }
  if ($("#logging_rotation_mode").val()) {
    finalJSON['logging']['rotation']['mode'] = $("#logging_rotation_mode").val()
  }
  if ($("#logging_rotation_when").val()) {
    finalJSON['logging']['rotation']['when'] = $("#logging_rotation_when").val()
  }
  if ($("#logging_rotation_interval").val()) {
    finalJSON['logging']['rotation']['interval'] = $("#logging_rotation_interval").val()
  }
  if ($("#logging_rotation_max_bytes").val()) {
    finalJSON['logging']['rotation']['max_bytes'] = $("#logging_rotation_max_bytes").val()
  }
  if ($("#logging_rotation_backup_count").val()) {
    finalJSON['logging']['rotation']['backup_count'] = $("#logging_rotation_backup_count").val()
  }

  return finalJSON
}

function fillLogging(log) {
  if (log.level) {
    $("#logging_level").val(log.level);
  }
  if (log.logfile) {
    $("#logging_logfile").val(log.logfile);
  }
  if (log.rotation) {
    if (log.rotation.mode) {
      $("#logging_rotation_mode").val(log.rotation.mode);
    }
    if (log.rotation.when) {
      $("#logging_rotation_when").val(log.rotation.when);
    }
    if (log.rotation.interval) {
      $("#logging_rotation_interval").val(log.rotation.interval);
    }
    if (log.rotation.max_bytes) {
      $("#logging_rotation_max_bytes").val(log.rotation.max_bytes);
    }
    if (log.rotation.backup_count) {
      $("#logging_rotation_backup_count").val(log.rotation.backup_count);
    }
    updateRotation(log.rotation.mode);
  }
}

function updateRotation(value) {
  if (value == "time") {
    $("#div_rotation_when").removeClass("hideIt");
    $("#div_rotation_interval").removeClass("hideIt");
    $("#div_rotation_max_bytes").addClass("hideIt");
  } else if (value == "size") {
    $("#div_rotation_when").addClass("hideIt");
    $("#div_rotation_interval").addClass("hideIt");
    $("#div_rotation_max_bytes").removeClass("hideIt");
  } else {
    $("#div_rotation_when").addClass("hideIt");
    $("#div_rotation_interval").addClass("hideIt");
    $("#div_rotation_max_bytes").addClass("hideIt");
  }
}

function fillResources(params) {
  var all_resources  = Object.keys(params)
  var resource_html =  document.getElementById('all_resources')
  for (i=0;i<all_resources.length;i++){
    console.log(all_resources[i])
    one_resource = addNewResource(all_resources[i],params[all_resources[i]],i)
    resource_html.innerHTML += one_resource
  }

}
function fillMetadata(meta) {
  if (meta.identification.title) {
    $("#metadata_identification_title").val(meta.identification.title);
  }
  if (meta.identification.description) {
    $("#metadata_identification_description").val(meta.identification.description);
  }
  if (meta.identification.keywords) {
    string = meta.identification.keywords.join(",");
    $("#metadata_identification_keywords").val(string);
  }
  if (meta.identification.keywords_type) {
    $("#metadata_identification_keywords_type").val(meta.identification.keywords_type);
  }
  if (meta.identification.terms_of_service) {
    $("#metadata_identification_terms_of_service").val(meta.identification.terms_of_service);
  }
  if (meta.identification.url) {
    $("#metadata_identification_url").val(meta.identification.url);
  }
  if (meta.license.name) {
    $("#metadata_license_name").val(meta.license.name);
  }
  if (meta.license.url) {
    $("#metadata_license_url").val(meta.license.url);
  }
  if (meta.provider.name) {
    $("#metadata_provider_name").val(meta.provider.name);
  }
  if (meta.provider.url) {
    $("#metadata_provider_url").val(meta.provider.url);
  }
  if (meta.contact.name) {
    $("#metadata_contact_name").val(meta.contact.name);
  }
  if (meta.contact.position) {
    $("#metadata_contact_position").val(meta.contact.position);
  }
  if (meta.contact.address) {
    $("#metadata_contact_address").val(meta.contact.address);
  }
  if (meta.contact.city) {
    $("#metadata_contact_city").val(meta.contact.city);
  }
  if (meta.contact.stateorprovince) {
    $("#metadata_contact_stateorprovince").val(meta.contact.stateorprovince);
  }
  if (meta.contact.postalcode) {
    $("#metadata_contact_postalcode").val(meta.contact.postalcode);
  }
  if (meta.contact.country) {
    $("#metadata_contact_country").val(meta.contact.country);
  }
  if (meta.contact.phone) {
    $("#metadata_contact_phone").val(meta.contact.phone);
  }
  if (meta.contact.fax) {
    $("#metadata_contact_fax").val(meta.contact.fax);
  }
  if (meta.contact.email) {
    $("#metadata_contact_email").val(meta.contact.email);
  }
  if (meta.contact.url) {
    $("#metadata_contact_url").val(meta.contact.url);
  }
  if (meta.contact.hours) {
    $("#metadata_contact_hours").val(meta.contact.hours);
  }
  if (meta.contact.instructions) {
    $("#metadata_contact_instructions").val(meta.contact.instructions);
  }
  if (meta.contact.role) {
    $("#metadata_contact_role").val(meta.contact.role);
  }
 
}

function updateMetadata(finalJSON) {
  if ($("#metadata_identification_title").val()){
    finalJSON['metadata']['identification']['title'] = $("#metadata_identification_title").val()
  }
  if ($("#metadata_identification_description").val()){
    finalJSON['metadata']['identification']['description'] = $("#metadata_identification_description").val()
  }
  if ($("#metadata_identification_keywords").val()){
    arr = $("#metadata_identification_keywords").val().split(',')
    finalJSON['metadata']['identification']['keywords'] = arr
  }
  if ($("#metadata_identification_keywords_type").val()){
    finalJSON['metadata']['identification']['keywords_type'] = $("#metadata_identification_keywords_type").val()
  }
  if ($("#metadata_identification_terms_of_service").val()){
    finalJSON['metadata']['identification']['terms_of_service'] = $("#metadata_identification_terms_of_service").val()
  }
  if ($("#metadata_identification_url").val()){
    finalJSON['metadata']['identification']['url'] = $("#metadata_identification_url").val()
  }

  if ($("#metadata_license_name").val()){
    finalJSON['metadata']['license']['name'] = $("#metadata_license_name").val()
  }
  if ($("#metadata_license_url").val()){
    finalJSON['metadata']['license']['url'] = $("#metadata_license_url").val()
  }
  if ($("#metadata_provider_name").val()){
    finalJSON['metadata']['provider']['name'] = $("#metadata_provider_name").val()
  }
  if ($("#metadata_provider_url").val()){
    finalJSON['metadata']['provider']['url'] = $("#metadata_provider_url").val()
  }
  if ($("#metadata_contact_name").val()){
    finalJSON['metadata']['contact']['name'] = $("#metadata_contact_name").val()
  }
  if ($("#metadata_contact_position").val()){
    finalJSON['metadata']['contact']['position'] = $("#metadata_contact_position").val()
  }
  if ($("#metadata_contact_address").val()){
    finalJSON['metadata']['contact']['address'] = $("#metadata_contact_address").val()
  }
  if ($("#metadata_contact_city").val()){
    finalJSON['metadata']['contact']['city'] = $("#metadata_contact_city").val()
  }
  if ($("#metadata_contact_stateorprovince").val()){
    finalJSON['metadata']['contact']['stateorprovince'] = $("#metadata_contact_stateorprovince").val()
  }

  if ($("#metadata_contact_postalcode").val()){
    finalJSON['metadata']['contact']['postalcode'] = $("#metadata_contact_postalcode").val()
  }
  if ($("#metadata_contact_country").val()){
    finalJSON['metadata']['contact']['country'] = $("#metadata_contact_country").val()
  }

  if ($("#metadata_contact_phone").val()){
    finalJSON['metadata']['contact']['phone'] = $("#metadata_contact_phone").val()
  }

  if ($("#metadata_contact_fax").val()){
    finalJSON['metadata']['contact']['fax'] = $("#metadata_contact_fax").val()
  }
  if ($("#metadata_contact_email").val()){
    finalJSON['metadata']['contact']['email'] = $("#metadata_contact_email").val()
  }
  if ($("#metadata_contact_url").val()){
    finalJSON['metadata']['contact']['url'] = $("#metadata_contact_url").val()
  }
  if ($("#metadata_contact_hours").val()){
    finalJSON['metadata']['contact']['hours'] = $("#metadata_contact_hours").val()
  }
  if ($("#metadata_contact_instructions").val()){
    finalJSON['metadata']['contact']['instructions'] = $("#metadata_contact_instructions").val()
  }
  if ($("#metadata_contact_role").val()){
    finalJSON['metadata']['contact']['role'] = $("#metadata_contact_role").val()
  }
 

  return finalJSON
 
}


function exportYML() {
  finalJSON = {
    "server":{
        "bind":{
            "host": null,
            "port": null,
        },
        "url":null,
        "mimetype":null,
        "encoding":null,
        "gzip":null,
        "languages":null,
            
        "pretty_print":null,
        "limit":null,
        "map":{
            "url":null,
            "attribution":null
        },
        "admin":null
    },
    "logging":{
        "level":null,
        "logfile": null,
    "rotation":{
        "mode": null,
        "max_bytes": null,
        "backup_count" : null,
        "when": null,
        "interval": null
    }
    },
    "metadata":{
        "identification":{
            "title": null,
            "description":null,
            "keywords":null,
            "keywords_type":null,
            "terms_of_service":null,
            "url":null
        },
        "license":{
            "name":null,
            "url":null,
        },
        "provider":{
            "name":null,
            "url":null,
        },
        "contact":{
            "name":null,
            "position":null,
            "address":null,
            "city":null,
            "stateorprovince":null,
            "postalcode":null,
            "country":null,
            "phone":null,
            "fax":null,
            "email":null,
            "url":null,
            "hours":null,
            "instructions":null,
            "role":null,
        }
    },"resources":{
        "obs":{
            "type":"collection",
            "title":"Observations",
            "description":"My cool observations",
            "keywords":[
                "observations",
                "monitoring"
            ],
            "linked-data":{
                "context":[
                    {
                        "datetime":"https://schema.org/DateTime"
                    },
                    {
                        "vocab":"https://example.com/vocab#",
                        "stn_id":"vocab:stn_id",
                        "value":"vocab:value"
                    }
                ]
            },
            "links":[
                {
                    "type":"text/csv",
                    "rel":"canonical",
                    "title":"data",
                    "href":"https://github.com/mapserver/mapserver/blob/branch-7-0/msautotest/wxs/data/obs.csv",
                    "hreflang":"en-US"
                },
                {
                    "type":"text/csv",
                    "rel":"alternate",
                    "title":"data",
                    "href":"https://raw.githubusercontent.com/mapserver/mapserver/branch-7-0/msautotest/wxs/data/obs.csv",
                    "hreflang":"en-US"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                },
                "temporal":{
                    "begin":"2000-10-30T18:24:39+00:00",
                    "end":"2007-10-30T08:57:29+00:00"
                }
            },
            "providers":[
                {
                    "type":"feature",
                    "name":"CSV",
                    "data":"tests/data/obs.csv",
                    "id_field":"id",
                    "geometry":{
                        "x_field":"long",
                        "y_field":"lat"
                    }
                }
            ]
        },
        "lakes":{
            "type":"collection",
            "title":{
                "en":"Large Lakes",
                "fr":"Grands Lacs"
            },
            "description":{
                "en":"lakes of the world, public domain",
                "fr":"lacs du monde, domaine public"
            },
            "keywords":{
                "en":[
                    "lakes",
                    "water bodies"
                ],
                "fr":[
                    "lacs",
                    "plans d'eau"
                ]
            },
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"http://www.naturalearthdata.com/",
                    "hreflang":"en-US"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                },
                "temporal":{
                    "begin":"2011-11-11T11:11:11+00:00",
                    "end":null
                }
            },
            "providers":[
                {
                    "type":"feature",
                    "name":"GeoJSON",
                    "data":"tests/data/ne_110m_lakes.geojson",
                    "id_field":"id",
                    "title_field":"name"
                }
            ]
        },
        "pgd":{
            "type":"collection",
            "title":{
                "en":"countries from pg",
                "fr":"Grands Lacs"
            },
            "description":{
                "en":"countries data from pg, public domain",
                "fr":"lacs du monde, domaine public"
            },
            "keywords":{
                "en":[
                    "countries",
                    "water bodies"
                ],
                "fr":[
                    "lacs",
                    "plans d'eau"
                ]
            },
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"http://www.naturalearthdata.com/",
                    "hreflang":"en-US"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                }
            },
            "providers":[
                {
                    "type":"feature",
                    "name":"PostgreSQL",
                    "data":{
                        "host":"127.0.0.1",
                        "port":5432,
                        "dbname":"postgres",
                        "user":"postgres",
                        "password":"postgres",
                        "search_path":[
                            "public"
                        ]
                    },
                    "id_field":"fid",
                    "table":"countries",
                    "geom_field":"geom"
                }
            ]
        },
        "mapserver_world_map":{
            "type":"collection",
            "title":"MapServer demo WMS world map",
            "description":"MapServer demo WMS world map",
            "keywords":[
                "MapServer",
                "world map"
            ],
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"https://demo.mapserver.org",
                    "hreflang":"en-US"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                }
            },
            "providers":[
                {
                    "type":"map",
                    "name":"WMSFacade",
                    "data":"https://demo.mapserver.org/cgi-bin/msautotest",
                    "options":{
                        "layer":"world_latlong",
                        "style":"default"
                    },
                    "format":{
                        "name":"png",
                        "mimetype":"image/png"
                    }
                }
            ]
        },
        "gdps-temperature":{
            "type":"collection",
            "title":"Global Deterministic Prediction System sample",
            "description":"Global Deterministic Prediction System sample",
            "keywords":[
                "gdps",
                "global"
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                }
            },
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"https://eccc-msc.github.io/open-data/msc-data/nwp_gdps/readme_gdps_en",
                    "hreflang":"en-CA"
                }
            ],
            "providers":[
                {
                    "type":"coverage",
                    "name":"rasterio",
                    "data":"tests/data/CMC_glb_TMP_TGL_2_latlon.15x.15_2020081000_P000.grib2",
                    "options":{
                        "DATA_ENCODING":"COMPLEX_PACKING"
                    },
                    "format":{
                        "name":"GRIB",
                        "mimetype":"application/x-grib2"
                    }
                }
            ]
        },
        "test-data":{
            "type":"stac-collection",
            "title":"pygeoapi test data",
            "description":"pygeoapi test data",
            "keywords":[
                "poi",
                "portugal"
            ],
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"https://github.com/geopython/pygeoapi/tree/master/tests/data",
                    "hreflang":"en-US"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                }
            },
            "providers":[
                {
                    "type":"stac",
                    "name":"FileSystem",
                    "data":"tests/data",
                    "file_types":[
                        ".gpkg",
                        ".sqlite",
                        ".csv",
                        ".grib2",
                        ".tif",
                        ".shp"
                    ]
                }
            ]
        },
        "canada-metadata":{
            "type":"collection",
            "title":{
                "en":"Open Canada sample data",
                "fr":"Exemple de donn\\u00e9es Canada Ouvert"
            },
            "description":{
                "en":"Sample metadata records from open.canada.ca",
                "fr":"Exemples d'enregistrements de m\\u00e9tadonn\\u00e9es sur ouvert.canada.ca"
            },
            "keywords":{
                "en":[
                    "canada",
                    "open data"
                ],
                "fr":[
                    "canada",
                    "donn\\u00e9es ouvertes"
                ]
            },
            "links":[
                {
                    "type":"text/html",
                    "rel":"canonical",
                    "title":"information",
                    "href":"https://open.canada.ca/en/open-data",
                    "hreflang":"en-CA"
                },
                {
                    "type":"text/html",
                    "rel":"alternate",
                    "title":"informations",
                    "href":"https://ouvert.canada.ca/fr/donnees-ouvertes",
                    "hreflang":"fr-CA"
                }
            ],
            "extents":{
                "spatial":{
                    "bbox":[
                        -180,
                        -90,
                        180,
                        90
                    ],
                    "crs":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                }
            },
            "providers":[
                {
                    "type":"record",
                    "name":"TinyDBCatalogue",
                    "data":"tests/data/open.canada.ca/sample-records.tinydb",
                    "id_field":"externalId",
                    "time_field":"created",
                    "title_field":"title"
                }
            ]
        },
        "hello-world":{
            "type":"process",
            "processor":{
                "name":"HelloWorld"
            }
        }
    }
}
updateServer(finalJSON)
updateMetadata(finalJSON)
updateLogging(finalJSON)
console.log(finalJSON)


const yamlString = objectToYAML(finalJSON);

// Create a Blob from the YAML string
const blob = new Blob([yamlString], { type: 'text/yaml' });

// Create a link element to download the Blob as a file
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'output.yaml';

// Append the link to the body, click it to start the download, and remove it
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

console.log('YAML file has been created and downloaded.');
}

function objectToYAML(obj, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  let yamlString = '';

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        yamlString += `${indent}${key}:\n${objectToYAML(value, indentLevel + 1)}`;
      } else if (Array.isArray(value)) {
        yamlString += `${indent}${key}:\n`;
        value.forEach(item => {
          yamlString += `${indent}  - ${item}\n`;
        });
      } else {
        yamlString += `${indent}${key}: ${value}\n`;
      }
    }
  }

  return yamlString;
}


// 