package vttp.miniproject2.server.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class StaticResourceController {

    @GetMapping(value = {"/", "/index.html", "/login"})
    public String serveIndex() {
        return "forward:/static/index.html";
    }

    @GetMapping(value = "/assets/{assetFolder}/{assetFile}", produces = MediaType.ALL_VALUE)
    @ResponseBody
    public Resource serveAsset(@PathVariable String assetFolder, @PathVariable String assetFile) {
        return new ClassPathResource("static/assets/" + assetFolder + "/" + assetFile);
    }
}