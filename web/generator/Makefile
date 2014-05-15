
RAW = https://raw.githubusercontent.com/wh1100717/tv.sohu_spider/master/README.md

DOCS = static/index.md \
  static/context.md \
  static/request.md \
  static/response.md \
  static/guide.md

index.html: views/index.jade $(DOCS)
	@./node_modules/.bin/jade $< -o ../templates/

static/index.md:
	curl -s $(RAW)/wh1100717/tv.sohu_spider/master/web/templates/api/index.md \
	  | ./rewrite.js > $@

static/context.md:
	curl -s $(RAW)/wh1100717/tv.sohu_spider/master/web/templates/api/context.md \
	  | ./rewrite.js > $@

static/request.md:
	curl -s $(RAW)/wh1100717/tv.sohu_spider/master/web/templates/api/request.md \
	  | ./rewrite.js > $@

static/response.md:
	curl -s $(RAW)/wh1100717/tv.sohu_spider/master/web/templates/api/response.md \
	  | ./rewrite.js > $@

static/guide.md:
	curl -s $(RAW)/wh1100717/tv.sohu_spider/master/web/templates/guide.md \
	  | ./rewrite.js > $@

clean:
	rm -fr *.html $(DOCS)

.PHONY: clean
