var convertXMLToNode = (function () {
    return function convertXMLToNode(xmlText) {
        var self = this;
        var node;
        var jsonObj = xml_str2json(xmlText);
        node = convertJSONToNode(jsonObj);
        return node;
    }
    function convertJSONToNode(jsonObj) {
        var self = this;
        var type = jsonObj.type;
        if (!laya.ui[type]) {
            return null;
        }
        var node = new laya.ui[type]();
        var props = jsonObj.props;
        for (var prop_name in props) {
            // 属性
            var prop_val = props[prop_name];

            if (!isNaN(Number(prop_val))) {
                prop_val = Number(prop_val);
            }
            node[prop_name] = prop_val;
        }
        var childs = jsonObj.childs;
        for (var i = 0; i < childs.length; i++) {
            var child_json = childs[i];
            var child_node = convertJSONToNode(child_json);
            if (child_node) {
                node.addChild(child_node);
            }
        }
        return node;
    }
    function xml2json(node, path) {
        var self = this;
        var result = {};
        result.type = getNodeLocalName(node);
        result.childs = [];
        var nodeChildren = node.childNodes;
        for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
            var child = nodeChildren.item(cidx);
            var childName = getNodeLocalName(child);
            var _child = xml2json(child);
            result.childs.push(_child);
        }

        // Attributes
        if (node.attributes) {
            result.props = {};
            for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                var attr = node.attributes.item(aidx);
                result.props[attr.name] = attr.value;
            }
        }
        return result;
    },
    function getNodeLocalName(node) {
        var nodeLocalName = node.localName;
        if (nodeLocalName === null) // Yeah, this is IE!!
            nodeLocalName = node.baseName;
        if (nodeLocalName === null || nodeLocalName === "") // =="" is IE too
            nodeLocalName = node.nodeName;
        return nodeLocalName;
    }
    function xml_str2json(xmlDocStr) {
        var self = this;
        var xmlDoc = parseXmlString(xmlDocStr);
        if (xmlDoc !== null)
            return xml2json(xmlDoc);
        else
            return null;
    }
    function parseXmlString(xmlDocStr) {
        var self = this;
        if (xmlDocStr === undefined) {
            return null;
        }
        var xmlDoc, parser;
        if (window.DOMParser) {
            parser = new window.DOMParser();
        }
        try {
            xmlDoc = parser.parseFromString(xmlDocStr, "text/xml").firstChild;
        } catch (err) {
            xmlDoc = null;
        }
        return xmlDoc;
    }
})()
