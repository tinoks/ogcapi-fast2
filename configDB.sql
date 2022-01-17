       SELECT InitSpatialMetaData('WGS84_ONLY');
       DROP TABLE data_licenses;

      CREATE TABLE collections(
        id TEXT NOT NULL UNIQUE,
        title TEXT,
        desc TEXT,
        keywords TEXT,
        tiles TEXT,
        items TEXT
      );
      SELECT AddGeometryColumn('collections', 'bbox', 4326, 'POLYGON', 'XY');
      SELECT CreateSpatialIndex('collections', 'bbox');

      CREATE TABLE sources(
        id TEXT NOT NULL,
        type TEXT,
        path TEXT,
        extra TEXT
      );

      CREATE TABLE styles(
        id TEXT,
        name TEXT,
        style TEXT
      );

      CREATE TABLE users(
        username TEXT,
        password TEXT,
        role TEXT
      );

      CREATE TABLE tokens(
        username TEXT,
        token TEXT
      );