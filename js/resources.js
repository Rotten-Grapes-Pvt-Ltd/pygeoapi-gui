
var id = 1;

var format_mime = {
    "png" : "image/png",
    "GRIB" : "application/x-grib2",
    "netcdf" : "application/x-netcdf",
    "zarr" : "application/zip",
    "pbf" : "application/vnd.mapbox-vector-tile"
}
// links for metadata
function getMetadataLinks(resource_id, link_id, metadata) {
  return `<div class="card mt-2 mb-2">
    <div class="card-header">
        <b>Link ${link_id}</b>
    </div>
    <div class="card-body collapse">
        <div class="row mb-3">
            <label for="resource_${resource_id}_link_${link_id}_type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${metadata.type}"
                    id="resource_${resource_id}_link_${link_id}_type">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_link_${link_id}_rel" class="col-sm-2 col-form-label">rel</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${metadata.rel}"
                    id="resource_${resource_id}_link_${link_id}_rel">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_link_${link_id}_title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${metadata.title}"
                    id="resource_${resource_id}_link_${link_id}_title">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_link_${link_id}_href" class="col-sm-2 col-form-label">href</label>
            <div class="col-sm-10">
                <input type="text" class="form-control"
                    value="${metadata.href}"
                    id="resource_${resource_id}_link_${link_id}_href">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_link_${link_id}_hreflang"
                class="col-sm-2 col-form-label">hreflang</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="en-US"
                    id="resource_${resource_id}_link_${link_id}_hreflang">
            </div>
        </div>
    </div>
</div>`;
}

// add new resource function
function addNewResource(resource_name, resource, resource_id) {
  if (resource.type != "process") {
    (keywords = ""),
      (spatial_bbox = ""),
      (temporal_begin = ""),
      (temporal_end = ""),
      (complete_links = ""),
      (complete_providers = "");
    if (resource.keywords && resource.keywords.length > 0) {
      keywords = resource.keywords.join();
    }
    if (
      resource.extents.spatial &&
      resource.extents.spatial.bbox &&
      resource.extents.spatial.bbox.length > 0
    ) {
      spatial_bbox = resource.extents.spatial.bbox.join();
    }

    if (resource.extents.temporal && resource.extents.temporal.begin) {
      temporal_begin = resource.extents.temporal.begin.toISOString();
    }
    if (resource.extents.temporal && resource.extents.temporal.end) {
      temporal_end = resource.extents.temporal.end.toISOString();
    }

    if (resource.links && resource.links.length > 0) {
      for (j = 0; j < resource.links.length; j++) {
        complete_links += getMetadataLinks(resource_id, j, resource.links[j]);
      }
    }
    if (resource.providers && resource.providers.length > 0) {
      for (k = 0; k < resource.providers.length; k++) {
        if (resource.providers[k].name == "CSV") {
          complete_providers += csvProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "GeoJSON") {
          complete_providers += GeoJSONProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "Elasticsearch") {
          complete_providers += ElasticsearchProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "ESRI") {
          complete_providers += ESRIProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "MongoDB") {
          complete_providers += MongoDBProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "PostgreSQL") {
          complete_providers += PostgreSQLProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "SQLiteGPKG") {
          complete_providers += SQLiteGPKGProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "SensorThings") {
          complete_providers += SensorThingsProvider(
            resource_id,
            k,
            resource.providers[k]
          );
        } else if (resource.providers[k].name == "WMSFacade") {
            complete_providers += WMSFacadeProvider(
              resource_id,
              k,
              resource.providers[k]
            );
          }else if (resource.providers[k].name == "MapScript") {
            complete_providers += MapScriptProvider(
              resource_id,
              k,
              resource.providers[k]
            );
          }
          else if (resource.providers[k].name == "xarray") {
            complete_providers += xarrayProvider(
              resource_id,
              k,
              resource.providers[k]
            );
          }

          

        
      }
    }

    return `<div class="card mt-2">
    <div class="card-header">
        <b>${resource_name}</b>
    </div>
    <div class="card-body collapse">
        <div class="row mb-3">
            <label for="resource_${resource_id}_type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${resource.type}" id="resource_${resource_id}_type">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${resource.title}"
                    id="resource_${resource_id}_title">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_description" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${resource.description}"
                    id="resource_${resource_id}_description">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_keywords" class="col-sm-2 col-form-label">Keywords</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${keywords}"
                    id="resource_${resource_id}_keywords">
            </div>
        </div>
        
        <div class="row mb-3">
            <label for="resource_${resource_id}_extent_spatial_bbox" class="col-sm-2 col-form-label">Spatial
                bbox</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${spatial_bbox}"
                    id="resource_${resource_id}_extent_spatial_bbox">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_extent_spatial_crs" class="col-sm-2 col-form-label">Spatial
                crs</label>
            <div class="col-sm-10">
                <input type="url" class="form-control"
                    value="${resource.extents.spatial.crs}"
                    id="resource_${resource_id}_extent_spatial_crs">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_extent_temporal_begin" class="col-sm-2 col-form-label">Temporal
                begin</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${temporal_begin}"
                    id="resource_${resource_id}_extent_temporal_begin">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_extent_temporal_end" class="col-sm-2 col-form-label">Temporal
                end</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${temporal_end}"
                    id="resource_${resource_id}_extent_temporal_end">
            </div>
        </div>
        <div id="links_of_resource_${resource_id}">${complete_links}</div>
        <div id="provider_of_resource_${resource_id}">${complete_providers}</div>
    </div>
</div>`;
  } else {
    return `<div class="card mt-2">
    <div class="card-header">
        <b>${resource_name}</b>
    </div>
    <div class="card-body collapse">
        <div class="row mb-3">
            <label for="resource_${resource_id}_type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${resource.type}" id="resource_${resource_id}_type">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${resource.processor.name}"
                    id="resource_${resource_id}_name">
            </div>
        </div>
        
    </div>
</div>`;
  }
}


// MVTtippecanoe resource
function MVTtippecanoeProvider(resource_id, provider_id, provider) {
    return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_min_zoon"
                  class="col-sm-2 col-form-label">min_zoon</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.zoom.min}"
                      id="resource_${resource_id}_provider_${provider_id}_min_zoon">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_max_zoon"
                  class="col-sm-2 col-form-label">max_zoon</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.zoom.max}"
                      id="resource_${resource_id}_provider_${provider_id}_max_zoon">
              </div>
          </div>
           <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name"
                  class="col-sm-2 col-form-label">name</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.format.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_mimetype"
                  class="col-sm-2 col-form-label">mimetype</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${format_mime[provider.format.name]}"
                      id="resource_${resource_id}_provider_${provider_id}_mimetype">
              </div>
          </div>
          
      </div>
  </div>`;
  }

// xarray resource
function xarrayProvider(resource_id, provider_id, provider) {
    return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_x_field"
                  class="col-sm-2 col-form-label">x_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.x_field}"
                      id="resource_${resource_id}_provider_${provider_id}_x_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_y_field"
                  class="col-sm-2 col-form-label">y_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.y_field}"
                      id="resource_${resource_id}_provider_${provider_id}_y_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_time_field"
                  class="col-sm-2 col-form-label">time_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.time_field}"
                      id="resource_${resource_id}_provider_${provider_id}_time_field">
              </div>
          </div>
           <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name"
                  class="col-sm-2 col-form-label">name</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.format.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_mimetype"
                  class="col-sm-2 col-form-label">mimetype</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${format_mime[provider.format.name]}"
                      id="resource_${resource_id}_provider_${provider_id}_mimetype">
              </div>
          </div>
          
      </div>
  </div>`;
  }

// WMSFacade resource
function WMSFacadeProvider(resource_id, provider_id, provider) {
    return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_layer"
                  class="col-sm-2 col-form-label">layer</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.layer}"
                      id="resource_${resource_id}_provider_${provider_id}_layer">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_style"
                  class="col-sm-2 col-form-label">style</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.style}"
                      id="resource_${resource_id}_provider_${provider_id}_style">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name"
                  class="col-sm-2 col-form-label">name</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.format.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_mimetype"
                  class="col-sm-2 col-form-label">mimetype</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${format_mime[provider.format.name]}"
                      id="resource_${resource_id}_provider_${provider_id}_mimetype">
              </div>
          </div>
      </div>
  </div>`;
  }

  // MapScript resource
function MapScriptProvider(resource_id, provider_id, provider) {
    return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type"
                  class="col-sm-2 col-form-label">type</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_layer"
                  class="col-sm-2 col-form-label">layer</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.layer}"
                      id="resource_${resource_id}_provider_${provider_id}_layer">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_style"
                  class="col-sm-2 col-form-label">style</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.options.style}"
                      id="resource_${resource_id}_provider_${provider_id}_style">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name"
                  class="col-sm-2 col-form-label">name</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.format.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_mimetype"
                  class="col-sm-2 col-form-label">mimetype</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${format_mime[provider.format.name]}"
                      id="resource_${resource_id}_provider_${provider_id}_mimetype">
              </div>
          </div>
      </div>
  </div>`;
  }

// CSV resource
function csvProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
    <div class="card-header">
        <b>Provider - ${provider_id}</b>
    </div>
    <div class="card-body collapse">
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <input type="text" disabled class="form-control" value="${provider.type}"
                    id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" disabled class="form-control" value="${provider.name}"
                    id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${provider.data}"
                    id="resource_${resource_id}_provider_${provider_id}_data">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                class="col-sm-2 col-form-label">id_field</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${provider.id_field}"
                    id="resource_${resource_id}_provider_${provider_id}_id_field">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_geometry_x" class="col-sm-2 col-form-label">X
                field</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${provider.geometry.x_field}"
                    id="resource_${resource_id}_provider_${provider_id}_geometry_x">
            </div>
        </div>
        <div class="row mb-3">
            <label for="resource_${resource_id}_provider_${provider_id}_geometry_y" class="col-sm-2 col-form-label">Y
                field</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="${provider.geometry.y_field}"
                    id="resource_${resource_id}_provider_${provider_id}_geometry_y">
            </div>
        </div>

    </div>
</div>`;
}

// MongoDB resource
function MongoDBProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_collection"
                  class="col-sm-2 col-form-label">collection</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.collection}"
                      id="resource_${resource_id}_provider_${provider_id}_collection">
              </div>
          </div>
  
      </div>
  </div>`;
}

// SensorThings resource
function SensorThingsProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_uri_field"
                  class="col-sm-2 col-form-label">uri_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.uri_field}"
                      id="resource_${resource_id}_provider_${provider_id}_uri_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_entity"
                  class="col-sm-2 col-form-label">entity</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.entity}"
                      id="resource_${resource_id}_provider_${provider_id}_entity">
              </div>
          </div>
  <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_time_field"
                  class="col-sm-2 col-form-label">time_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.time_field}"
                      id="resource_${resource_id}_provider_${provider_id}_time_field">
              </div>
          </div>
  <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_intralink"
                  class="col-sm-2 col-form-label">intralink</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.intralink}"
                      id="resource_${resource_id}_provider_${provider_id}_intralink">
              </div>
          </div>
  
      </div>
  </div>`;
}
// SQLiteGPKG resource
function SQLiteGPKGProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                  class="col-sm-2 col-form-label">id_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.id_field}"
                      id="resource_${resource_id}_provider_${provider_id}_id_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_table"
                  class="col-sm-2 col-form-label">table</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.table}"
                      id="resource_${resource_id}_provider_${provider_id}_table">
              </div>
          </div>
  
      </div>
  </div>`;
}

// PostgreSQL resource
function PostgreSQLProvider(resource_id, provider_id, provider) {
  search_path = "";
  if (provider.search_path && provider.search_path.length > 0) {
    search_path = provider.search_path.join();
  }
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="csv">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_host" class="col-sm-2 col-form-label">host</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data.host}"
                      id="resource_${resource_id}_provider_${provider_id}_host">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_port" class="col-sm-2 col-form-label">port</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data.port}"
                      id="resource_${resource_id}_provider_${provider_id}_port">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_dbname" class="col-sm-2 col-form-label">dbname</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data.dbname}"
                      id="resource_${resource_id}_provider_${provider_id}_dbname">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_user" class="col-sm-2 col-form-label">user</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data.user}"
                      id="resource_${resource_id}_provider_${provider_id}_user">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_password" class="col-sm-2 col-form-label">password</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data.password}"
                      id="resource_${resource_id}_provider_${provider_id}_password">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_search_path" class="col-sm-2 col-form-label">search_path</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${search_path}"
                      id="resource_${resource_id}_provider_${provider_id}_search_path">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                  class="col-sm-2 col-form-label">id_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.id_field}"
                      id="resource_${resource_id}_provider_${provider_id}_id_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_table"
                  class="col-sm-2 col-form-label">table</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.table}"
                      id="resource_${resource_id}_provider_${provider_id}_table">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_geom_field"
                  class="col-sm-2 col-form-label">geom_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.geom_field}"
                      id="resource_${resource_id}_provider_${provider_id}_geom_field">
              </div>
          </div>
  
      </div>
  </div>`;
}

// GeoJSON resource
function GeoJSONProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
      <div class="card-header">
          <b>Provider - ${provider_id}</b>
      </div>
      <div class="card-body collapse">
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.type}"
                      id="resource_${resource_id}_provider_${provider_id}_type" value="feature">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                  <input type="text" disabled class="form-control" value="${provider.name}"
                      id="resource_${resource_id}_provider_${provider_id}_name" value="GeoJSON">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.data}"
                      id="resource_${resource_id}_provider_${provider_id}_data">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                  class="col-sm-2 col-form-label">id_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.id_field}"
                      id="resource_${resource_id}_provider_${provider_id}_id_field">
              </div>
          </div>
          <div class="row mb-3">
              <label for="resource_${resource_id}_provider_${provider_id}_title_field"
                  class="col-sm-2 col-form-label">title_field</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control" value="${provider.title_field}"
                      id="resource_${resource_id}_provider_${provider_id}_title_field">
              </div>
          </div>
      </div>
  </div>`;
}

// Elasticsearch resource
function ElasticsearchProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
        <div class="card-header">
            <b>Provider - ${provider_id}</b>
        </div>
        <div class="card-body collapse">
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${provider.type}"
                        id="resource_${resource_id}_provider_${provider_id}_type" >
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${provider.name}"
                        id="resource_${resource_id}_provider_${provider_id}_name" >
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_editable" class="col-sm-2 col-form-label">Editable</label>
                    <div class="col-sm-10">
                        <input class="form-check-input" type="checkbox" id="resource_${resource_id}_provider_${provider_id}_editable" value="resource_${resource_id}_provider_${provider_id}_editable">
                    </div>
                </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.data}"
                        id="resource_${resource_id}_provider_${provider_id}_data">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                    class="col-sm-2 col-form-label">id_field</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.id_field}"
                        id="resource_${resource_id}_provider_${provider_id}_id_field">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_title_field"
                    class="col-sm-2 col-form-label">title_field</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.title_field}"
                        id="resource_${resource_id}_provider_${provider_id}_title_field">
                </div>
            </div>
        </div>
    </div>`;
}

// ESRI resource
function ESRIProvider(resource_id, provider_id, provider) {
  return `<div id="resource_${resource_id}_provider_${provider_id}" class="card mt-2 mb-2">
        <div class="card-header">
            <b>Provider - ${provider_id}</b>
        </div>
        <div class="card-body collapse">
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_type" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${provider.type}"
                        id="resource_${resource_id}_provider_${provider_id}_type" >
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${provider.name}"
                        id="resource_${resource_id}_provider_${provider_id}_name" >
                </div>
            </div>
             <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_crs" class="col-sm-2 col-form-label">CRS</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.crs}"
                        id="resource_${resource_id}_provider_${provider_id}_crs">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_data" class="col-sm-2 col-form-label">Data</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.data}"
                        id="resource_${resource_id}_provider_${provider_id}_data">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_username" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.username}"
                        id="resource_${resource_id}_provider_${provider_id}_username">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.password}"
                        id="resource_${resource_id}_provider_${provider_id}_password">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_id_field"
                    class="col-sm-2 col-form-label">id_field</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.id_field}"
                        id="resource_${resource_id}_provider_${provider_id}_id_field">
                </div>
            </div>
            <div class="row mb-3">
                <label for="resource_${resource_id}_provider_${provider_id}_title_field"
                    class="col-sm-2 col-form-label">title_field</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" value="${provider.title_field}"
                        id="resource_${resource_id}_provider_${provider_id}_title_field">
                </div>
            </div>
        </div>
    </div>`;
}
