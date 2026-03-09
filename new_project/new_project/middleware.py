import time

class LoadTimeMiddleWare:
    def __init__(self,get_response):
        self.get_response=get_response
    
    def __call__(self, request):
        start_time=time.time()
        response=self.get_response(request)
        end_time=time.time()
        load_time=end_time-start_time
        print(f"Page loaded in {load_time:.4f} seconds")
        return response
        