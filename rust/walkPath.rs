use std::fs;
use std::path::Path;

fn main() {
    // println!("{:?}", path.u)
    walk_path("./")
}

fn walk_path(path_o: &str) {
    let paths = fs::read_dir(path_o).unwrap();
    for path in paths {
        let path_d = path.unwrap().path();
        let path_type = dectect_path(&path_d);
        if path_type == "dir" {
            let path_str = &path_d.to_str().unwrap();
            println!("{}: {:?}", path_type, path_d);
            walk_path(path_str);
            continue;
        }
        println!("{}: {:?}", path_type, path_d);
    }
}

fn dectect_path(path: &Path) -> &str {
    let md = fs::metadata(path).unwrap();
    let mut path_type = "file";
    if md.is_dir() {
        path_type = "dir";
    }
    path_type
}
