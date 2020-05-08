from .app import db


class belly_button(db.Model):
    __tablename__ = 'belly_button'

    names = db.Column(db.String(64))
    metadata = db.Column(db.Float)
    samples = db.Column(db.Float)

    def __repr__(self):
        return '<belly_button %r>' % (self.names)
