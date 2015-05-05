import webapp2
from google.appengine.ext import ndb
import json

class Task(ndb.Model):
    title = ndb.StringProperty()
    done = ndb.BooleanProperty(default=False)

    def to_dict(self):
        return {
            'key': self.key.urlsafe(),
            'title': self.title,
            'done': self.done,
        }

class TasksHandler(webapp2.RequestHandler):

    def get(self):
        tasks = Task.query()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([task.to_dict() for task in tasks]))
    
    def post(self):
        data = json.loads(self.request.body)
        task = Task()
        task.title = data['title']
        task.put()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(task.to_dict()))

app = webapp2.WSGIApplication([
    webapp2.Route(r'/task', handler=TasksHandler),
], debug=True)
