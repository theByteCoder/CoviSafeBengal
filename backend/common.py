from configparser import ConfigParser


def get_db_object_id(object_grp, object_id):
    config = ConfigParser()
    config.read('config.cfg')
    object_id = config[object_grp][object_id]
    return object_id


def set_db_object_id(object_grp, object_prop, object_id):
    config = ConfigParser()
    config.read('config.cfg')
    db = config[object_grp]
    db[object_prop] = f'{object_id}'
    with open('config.cfg', 'w') as conf:
        config.write(conf)
