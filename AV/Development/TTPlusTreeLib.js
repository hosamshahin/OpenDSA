(function ($) {
  "use strict";
  var global = window.ttplustree = {};

  global.rect_padding = 10;

  global.drawRectangle = function (jsav, rect, node1, node2) {
    var stoke = 2;
    var padding = global.rect_padding;
    var n1p = $(node1.array.element).position();
    var n2p = $(node2.array.element).position();
    var width = $(node1.array.element).outerWidth();
    var height = $(node1.array.element).outerHeight();

    var x = n1p.left - padding + 3;
    var y = n1p.top - padding + 3;
    var w = (n2p.left + width) - (n1p.left) + (padding * 2);
    var h = height + (padding * 2);

    if (rect) {
      rect.hide();
    }
    rect = jsav.g.rect(x, y, w, h);
    rect.addClass("node-split-rect");
    return rect;
  };

  global.drawLeafArrows = function (jsav, leafList, arrowList) {
    // Add as many elements to the leafs arrows arrays as there are leafs
    while (arrowList.length !== leafList.length) {
      if (arrowList.length < leafList.length) {
        arrowList.push(null);
      } else if (arrowList.length > leafList.length) {
        var edge = arrowList.pop();
        if (edge) {
          edge.hide();
        }
      }
    }

    // Draw the arrows
    for (var i = 0; i < leafList.length - 1; i++) {
      var p1 = $(leafList[i].array.element).position();
      var p2 = $(leafList[i + 1].array.element).position();
      var w1 = $(leafList[i].array.element).outerWidth();
      var h1 = $(leafList[i].array.element).outerHeight();
      var h2 = $(leafList[i + 1].array.element).outerHeight();

      var x1 = p1.left + w1,
        y1 = p1.top + (h1 / 2),
        x2 = p2.left,
        y2 = p2.top + (h2 / 2);

      if (!arrowList[i]) {
        arrowList[i] = jsav.g.line(x1, y1, x2, y2, {"arrow-end": "classic", "stroke-width": 3.0});
      } else {
        arrowList[i].movePoints([[0, x1, y1], [1, x2, y2]]);
      }
    }
  };

  global.newNode = function (jsav, keys, isLeaf, values) {
    if (isLeaf) {
      for (var i = 0; i < keys.length; i++) {
        keys[i] = keys[i] + '<br><div class="leaf-node-value">' + values[i] + '</div>';
      }
    }
    var arr = jsav.ds.array(keys, {left: "0", top: "0"});
    if (isLeaf) {
      arr.element.addClass('leaf-node');
    } else {
      arr.element.addClass('internal-node');
    }
    return new global.node(jsav, arr, isLeaf).center();
  };

  global.node = function (jsav, arr, isLeaf) {
    this.jsav = jsav;
    this.array = arr;
    this.isLeaf = isLeaf;
    this.children = [];
    this.edges = [];
  };

  var nodeproto = global.node.prototype;
  nodeproto.value = function (idx, key, value) {
    if (!key && key !== "") {
      return this.array.value(idx);
    }
    if (this.isLeaf && value) {
      key = key + '<br><div class="leaf-node-value">' + value + '</div>';
    }
    this.array.value(idx, key);
  };

  nodeproto.move = function (left, top) {
    this.array.css({"left": "+=" + left + "px", "top": "+=" + top + "px"});
  };

  nodeproto.center = function () {
    var canvas = $(this.array.element).parent();
    var cw = $(canvas).outerWidth();
    var aw = $(this.array.element).outerWidth();
    var left_offset = (cw / 2) - (aw / 2);
    this.array.css({left: left_offset + "px", top: "5px"});
    return this;
  };

  nodeproto.addChild = function (newChild) {
    this.children.push(newChild);
    this.edges.push(null);
    this.drawEdge(this.children.length - 1);
  };

  nodeproto.insertChild = function (idx, newChild) {
    this.children.splice(idx, 0, newChild);
    this.edges.splice(idx, 0, null);
  };

  nodeproto.removeChild = function (idx) {
    // Remove child and edge
    var child = this.children.splice(idx, 1);
    var edge = this.edges.splice(idx, 1);
    // Hide edge
    if (edge[0]) {
      edge[0].hide();
    }
    // Return child
    return child[0];
  };

  nodeproto.drawEdge = function (child_idx) {
    // Calculate edge position
    var pos = $(this.array.element).position();
    var c_pos = $(this.children[child_idx].array.element).position();
    var x1 = pos.left,
      y1 = pos.top,
      x2 = c_pos.left,
      y2 = c_pos.top;

    // Adjust coordinates to align edges with arrays
    var left_off = ($(this.array.element).outerWidth() / $(this.array.element).children('li').size()) * child_idx;
    var top_off = $(this.array.element).outerHeight();
    x1 += left_off;
    y1 += top_off;
    x2 += $(this.children[child_idx].array.element).outerWidth() / 2;
    y2 += 2;

    if (child_idx === 0) {
      x1 += 2;
      y1 -= 1;
    } else if (child_idx === 2) {
      x1 -= 2;
      y1 -= 1;
    }

    // Set edge to right position
    if (!this.edges[child_idx]) {
      this.edges[child_idx] = this.jsav.g.line(x1, y1, x2, y2);
    } else {
      this.edges[child_idx].movePoints([[0, x1, y1], [1, x2, y2]]);
    }
  };

  nodeproto.updateEdges = function (recursive) {
    for (var i = 0; i < this.edges.length; i++) {
      this.drawEdge(i);
      if (recursive) {
        this.children[i].updateEdges(recursive);
      }
    }
    return this;
  };

  nodeproto.getLeafs = function () {
    if (this.isLeaf) {
      return [this];
    } else {
      var result = [];
      for (var i = 0; i < this.children.length; i++) {
        result = result.concat(this.children[i].getLeafs());
      }
      return result;
    }
  };

  nodeproto.hideEdges = function () {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hide();
    }
    return this;
  };

  nodeproto.hideEdge = function (idx) {
    this.edges[idx].hide();
  };

  nodeproto.showEdges = function () {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
    return this;
  };

  nodeproto.showEdge = function (idx) {
    this.edges[idx].show();
    return this;
  };

  nodeproto.highlightToggle = function () {
    if (this.array.isHighlight()) {
      this.array.unhighlight();
    } else {
      this.array.highlight();
    }
  };

  nodeproto.highlightToggleEdge = function (idx) {
    this.edges[idx].toggleClass('highlight-edge');
  };

  nodeproto.child = function (pos) {
    return this.children[pos];
  };

}(jQuery));