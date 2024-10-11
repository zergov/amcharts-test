import * as am5 from '@amcharts/amcharts5'
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { useEffect } from 'react'

const files = {
  "api/": {
    "app/": {},
    "bin/": {},
    "config/": {},
    "db/": {
      "migrate/": {
        "20241004015517_create_repositories.rb": {},
        "20241006232458_create_commits.rb": {},
        "20241007003949_create_commit_file_changes.rb": {},
      },
      "cable_schema.rb": {},
      "cache_schema.rb": {},
      "queue_schema.rb": {},
      "schema.rb": {},
      "seeds.rb": {},
    },
    "lib/": {},
    "log/": {},
    "public/": {},
    "script/": {},
    "storage/": {},
    "test/": {},
    "tmp/": {},
    "vendor/": {},
    "config.ru": {},
    "Dockerfile": {},
    "Dockerfile.dev": {},
    "Gemfile": {},
    "Gemfile.lock": {},
    "Rakefile": {},
    "README.md": {},
  },
  "Backend/": {
    "alembic/": {},
    "api/": {},
    "cache/": {},
    "resources/": {},
    "test/": {},
    "CHANGELOG.md": {},
    "conftest.py": {},
    "docker-compose.yaml": {},
    "Dockerfile": {},
    "pytest.ini": {},
    "README.md": {},
    "setup.cfg": {},
  },
  "Documentation/": {
  },
  "Frontend/": {
  },
  "compose.yml": {},
  "LICENSE": {},
  "README.md": {},
}

function generate_directory_structure(tree) {
  const root = []

  for (const [path, child_tree] of Object.entries(tree)) {
    const child_tree_size = Object.keys(child_tree).length;

    if (child_tree_size > 0) {
      root.push({
        name: path,
        value: child_tree_size * 5,
        children: generate_directory_structure(child_tree)
      })
    } else {
      root.push({
        name: path,
        value: 5,
      })
    }
  }

  return root;
}

function App() {
  useEffect(() => {
    const root = am5.Root.new("chart-div")

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const container = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout
    }));

    var series = container.children.push(am5hierarchy.Pack.new(root, {
      singleBranchOnly: false,
      downDepth: 1,
      initialDepth: 10,
      valueField: "value",
      categoryField: "name",
      childDataField: "children"
    }));

    var data = {
      name: "Root",
      children: generate_directory_structure(files),
    }

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div id="chart-div">
    </div>
  );
}

export default App;
