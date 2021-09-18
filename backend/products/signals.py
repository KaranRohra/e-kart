from django.db.models import signals
from django.dispatch.dispatcher import receiver
from products import models


def get_request():
    import inspect

    for frame_record in inspect.stack():
        if frame_record[3] == "get_response":
            request = frame_record[0].f_locals["request"]
            break
    else:
        request = None
    return request


@receiver(signals.pre_save, sender=models.Product)
def product_pre_save_signal(sender, instance, **kwargs):
    request = get_request()
    instance.seller = request.user
