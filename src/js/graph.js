/*
 * Contient les méthodes permettant d'ajouter des trucs graphiques sans passer par gQ
 */

addRectangle: function(sprite, options) {
            options = $.extend({
                width:          32,
                height:         32,
                posx:           0,
                posy:           0,
                posz:           0,
                posOffsetX:     0,
                posOffsetY:     0,
                idleCounter:    0,
                currentFrame:   0,
                frameIncrement: 1,
                geometry:       $.gameQuery.GEOMETRY_RECTANGLE,
                angle:          0,
                factor:         1,
                playing:        true,
                factorh:        1,
                factorv:        1
            }, options);

            var newSpriteElem = spriteFragment.clone().attr("id",sprite).css({
                     height: options.height,
                     width: options.width,
                     backgroundPosition: ((options.animation)? -options.animation.offsetx : 0)+"px "+((options.animation)? -options.animation.offsety : 0)+"px"
                });
                
            if(this == $.gameQuery.playground){
                $.gameQuery.scenegraph.append(newSpriteElem);
            } else {
                this.append(newSpriteElem);
            }