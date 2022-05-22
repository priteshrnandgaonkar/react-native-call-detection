//
//  CallDetectionManager.m
//
//
//  Created by Pritesh Nandgaonkar on 16/06/17.
//  Updated by Doug Watkins for Inside Real Estate on 31/07/19
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "CallDetectionManager.h"
@import CallKit;

typedef void (^CallBack)();
@interface CallDetectionManager()

@property(strong, nonatomic) RCTResponseSenderBlock block;
@property(strong, nonatomic) CXCallObserver* callObserver;
@property(nonatomic) long* _backgroundUpdateTask;

@end

@implementation CallDetectionManager

- (NSArray<NSString *> *)supportedEvents {
    return @[@"PhoneCallStateUpdate"];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addCallBlock:(RCTResponseSenderBlock) block) {
    // Setup call tracking
    self.block = block;
    self.callObserver = [[CXCallObserver alloc] init];
    __typeof(self) weakSelf = self;
    [self.callObserver setDelegate:weakSelf queue:nil];
}

RCT_EXPORT_METHOD(startListener) {
    [self beginBackgroundUpdateTask];
    // Setup call tracking
    self.callObserver = [[CXCallObserver alloc] init];
    __typeof(self) weakSelf = self;
    [self.callObserver setDelegate:weakSelf queue:nil];
}

RCT_EXPORT_METHOD(stopListener) {
    // Setup call tracking
    self.callObserver = nil;
    [self endBackgroundUpdateTask];
}

- (void) beginBackgroundUpdateTask
{
    self._backgroundUpdateTask = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{
        [self endBackgroundUpdateTask];
    }];
}

- (void) endBackgroundUpdateTask
{
    [[UIApplication sharedApplication] endBackgroundTask: self._backgroundUpdateTask];
    self._backgroundUpdateTask = UIBackgroundTaskInvalid;
}

- (void)callObserver:(CXCallObserver *)callObserver callChanged:(CXCall *)call {
    if (call.hasEnded == true) {
      [self sendEventWithName:@"PhoneCallStateUpdate" body:@"Disconnected"];
    }
    if (call.isOutgoing == true && call.hasConnected == false && call.hasEnded == false) {
      [self sendEventWithName:@"PhoneCallStateUpdate" body:@"Dialing"];
    }
    if (call.isOutgoing == false && call.hasConnected == false) {
      [self sendEventWithName:@"PhoneCallStateUpdate" body:@"Incoming"];
    }
    if (call.hasEnded == false && call.hasConnected == true) {
      [self sendEventWithName:@"PhoneCallStateUpdate" body:@"Connected"];
    }
}

@end
