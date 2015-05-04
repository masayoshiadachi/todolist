import webapp2

class HelloHandler(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, GAE!')

app = webapp2.WSGIApplication([
    webapp2.Route(r'/hello', handler=HelloHandler),
], debug=True)
