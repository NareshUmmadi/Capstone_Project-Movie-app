import { HttpClient } from '@angular/common/http';
import { AdminService } from './admin.service';
import { of } from 'rxjs';

describe('AdminService', () => {
  let service: AdminService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get','put','delete','post']);
    service=new AdminService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give credits',()=>{
    httpClientSpy.put.and.returnValue(of(true));
    service.giveCredits("","");
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);

  })

  it('should gift subscription',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.giveSubscription("","");
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  })

  it('should get all users',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getAllUsers();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  })

});
