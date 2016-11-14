commute-web
===========


Docker build
------------

```
    docker build -t commute/commute-web .
```


Docker run
----------

```
     docker run -e "GOOGLE_MAP_API_KEY=<API_KEY>" --rm --name commute/commute-web commute-web
```


Docker run into Bash
--------------------

```
     docker run -e "GOOGLE_MAP_API_KEY=<API_KEY>" --rm -it --name commute/commute-web commute-web bash
```

Docker logs
-----------

```
    docker logs commute-web
```

Other Infos
-----------

Based on React Redux Starter Kit
