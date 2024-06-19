import { RunService } from "@rbxts/services";
import { TweenTools } from "../tween_tools";

const max = math.max;
export class Timer {
  static Create(callback: (timer: Timer, GetConnection: () => RBXScriptConnection | undefined) =>
    { wait_time?: number, one_shot?: boolean, autostart?: boolean, timeout_callback?: () => void }) {
    const timer = new Timer();
    let connection: RBXScriptConnection | undefined
    const { wait_time, one_shot, autostart, timeout_callback } = callback(timer, () => connection);
    if (wait_time !== undefined) timer.wait_time_ = wait_time;
    if (one_shot !== undefined) timer.one_shot_ = one_shot;
    if (timeout_callback) connection = timer.on_time_out_.Connect(timeout_callback);
    if (autostart) timer.Start();
    return $tuple(timer, connection);
  }

  public wait_time_ = 1;
  private time_left_ = 0;

  public one_shot_ = true;

  public paused_ = false;
  private stopped_ = true;

  private time_out_event_: BindableEvent = new Instance("BindableEvent");
  readonly on_time_out_: RBXScriptSignal = this.time_out_event_.Event;

  private update_connection_?: RBXScriptConnection

  Start(time_sec = -1) {
    if (time_sec > 0) {
      this.wait_time_ = time_sec;
    }
    //stops the existing timer
    this.Stop();

    this.time_left_ = this.wait_time_;
    //takes stopped flag away
    this.stopped_ = false;
    this.update_connection_ = RunService.Heartbeat.Connect(delta_time => this.Update(delta_time));
  }

  private Update(delta_time: number) {
    //dont update if paused
    if (this.paused_) return;

    this.time_left_ -= delta_time;
    if (this.time_left_ > 0) return

    this.time_out_event_.Fire();

    if (!this.one_shot_) {
      //restarts the time if not oneshot
      this.time_left_ = this.wait_time_;
      return;
    }

    //stops if one shot
    this.Stop();
  }

  Stop() {
    if (this.stopped_) return;

    //clamps the time
    this.time_left_ = max(this.time_left_, 0);
    this.update_connection_?.Disconnect();
    this.paused_ = false;
    this.stopped_ = true;
  }
  IsStopped() {
    return this.stopped_;
  }

  GetTimeLeft() {
    return this.time_left_;
  }

  Destroy() {
    this.Stop();
    this.time_out_event_.Destroy();
  }
}

export class CallbackTimer {
  static Create(callback: (timer: CallbackTimer) =>
    Partial<{
      wait_time: number,
      one_shot: boolean,
      autostart: boolean,
      timeout_callback: () => void,
      yield_after_call: boolean,
      terminate_old: boolean
    }>) {
    const timer = new CallbackTimer();
    const { wait_time, one_shot, autostart, timeout_callback, yield_after_call, terminate_old } = callback(timer);
    if (wait_time !== undefined) timer.wait_time_ = wait_time;
    if (one_shot !== undefined) timer.one_shot_ = one_shot;
    if (timeout_callback !== undefined) timer.SetCallback(timeout_callback);
    if (yield_after_call !== undefined) timer.yield_after_call_ = yield_after_call;
    if (terminate_old !== undefined) timer.terminate_old_ = terminate_old;
    if (autostart) timer.Start();

    return timer;
  }
  public wait_time_ = 1;
  /**dont restart the timer til the callback is finished. 
   * 
   *Applied only if one_shot is false
   */
  public yield_after_call_ = false;
  /**stops the previous callback if it's still running. 
   * 
   *Applied only if one_shot is false
  */
  public terminate_old_ = false;
  private start_time_ = 0;

  public one_shot_ = true;

  private stopped_ = true;

  private thread_?: thread;
  private callback_thread_?: thread;
  private callback_: () => void = () => { };

  Start(time_sec = -1) {
    if (time_sec > 0) {
      this.wait_time_ = time_sec;
    }
    //stops the existing timer
    this.Stop();

    this.start_time_ = os.clock();
    //takes stopped flag away
    this.stopped_ = false;
    this.thread_ = task.spawn(() => this.Cycle());
  }

  private TerminateCallbackThread() {
    if (this.callback_thread_ === undefined) return;
    task.cancel(this.callback_thread_);
    this.callback_thread_ = undefined;
  }

  private Cycle() {
    while (task.wait(this.wait_time_)) {
      if (this.terminate_old_) this.TerminateCallbackThread();
      if (this.yield_after_call_) this.callback_();
      else this.callback_thread_ = task.spawn(this.callback_);
      if (this.one_shot_) break;
    }
    //cannot stop the thread from inside;
    this.stopped_ = true;
  }

  StopInThread(terminate_callback: boolean = false) {
    this.stopped_ = true;
    if (terminate_callback) this.TerminateCallbackThread();
  }

  Stop(terminate_callback: boolean = false) {
    if (this.thread_ !== undefined) {
      task.cancel(this.thread_);
      this.thread_ = undefined;
    }
    if (terminate_callback) this.TerminateCallbackThread();

    this.stopped_ = true;
  }

  SetCallback(callback: () => void) {
    this.callback_ = callback;
  }

  IsStopped() {
    return this.stopped_;
  }

  GetTimeLeft() {
    return math.max(
      this.wait_time_ - (os.clock() - this.start_time_)
      , 0);
  }

  Destroy() {
    this.Stop();
  }
}

const clock = os.clock;
export class FlagTimer {
  public wait_time_ = 1;
  private time_left_ = 0;
  private current_time_ = 0;
  private stopped_ = true;

  Start(time_sec = -1) {
    if (time_sec > 0) {
      this.wait_time_ = time_sec;
    }
    this.time_left_ = this.wait_time_;
    this.current_time_ = os.clock();
    this.stopped_ = false;
  }

  Stop() {
    this.stopped_ = true;
  }

  IsStopped() {
    if (this.stopped_) return true;
    //recalculates stop;
    this.stopped_ = clock() - this.current_time_ >= this.time_left_;
    return this.stopped_;
  }
}

type FrameTimerCallback = (time_passed: number, delta_time: number) => void
export class FrameTimer {
  /**
   * @param GetConnection will return the connection, but ONLY USE IN update_callback or timeout_callback
   */
  static Create(
    callback: (timer: FrameTimer, GetConnection: () => RBXScriptConnection | undefined) =>
      { wait_time?: number, one_shot?: boolean, autostart?: boolean, update_callback?: FrameTimerCallback, timeout_callback?: () => void }
  ) {
    const timer = new FrameTimer();
    let connection: RBXScriptConnection | undefined
    const { wait_time, one_shot, autostart, update_callback, timeout_callback } = callback(timer, () => connection);
    if (wait_time !== undefined) timer.wait_time_ = wait_time;
    if (one_shot !== undefined) timer.one_shot_ = one_shot;
    if (update_callback) timer.SetCallback(update_callback);
    if (timeout_callback) connection = timer.on_time_out_.Connect(timeout_callback);
    if (autostart) timer.Start();
    return $tuple(timer, connection);
  }

  static CreateFast(callback: (timer: FrameTimer) => { wait_time: number, update_callback: FrameTimerCallback, yields?: boolean, destroy_after_ended?: boolean }) {
    const timer = new FrameTimer();
    const { wait_time, update_callback, yields, destroy_after_ended } = callback(timer);
    timer.SetCallback(update_callback);
    if (destroy_after_ended ?? true) timer.on_time_out_.Once(() => timer.Destroy());
    timer.wait_time_ = wait_time;
    timer.Start();
    if (yields ?? true) task.wait(wait_time);
    if (!destroy_after_ended) return timer;
  }

  static CreateTween<T extends Tweenable>(
    start_value: T, target_value: T, wait_time: number, set_function: (new_value: T) => void,
    auto_start: boolean = true,
    easing_style?: Enum.EasingStyle, easing_direction?: Enum.EasingDirection) {
    const timer = new FrameTimer();
    timer.one_shot_ = true;
    timer.wait_time_ = wait_time;
    timer.SetCallback((time_passed) => {
      const alpha = time_passed / wait_time;
      const new_value = TweenTools.TweenValue(start_value, target_value, alpha, easing_style, easing_direction);
      set_function(new_value);
    })
    if (auto_start) timer.Start();
    return timer;
  }

  static CreateCustomTween<T extends Tweenable>(
    start_value: T, target_value: T, wait_time: number,
    create_tweener: () => (alpha: number, delta_time: number, time_passed: number, wait_time: number) => number,
    set_function: (new_value: T) => void,
    auto_start: boolean = true) {
    const timer = new FrameTimer();
    timer.wait_time_ = wait_time;
    const tweener = create_tweener();
    timer.SetCallback((time_passed, delta_time) => {
      const alpha = time_passed / wait_time;
      const new_alpha = tweener(alpha, delta_time, time_passed, wait_time);
      const new_value = TweenTools.LerpValue(start_value, target_value, new_alpha)
      set_function(new_value);
    })
    if (auto_start) timer.Start();
    return timer;
  }

  public wait_time_ = 1;
  private time_left_ = 0;
  private initialized_wait_time_ = 0;

  public one_shot_ = true;

  public paused_ = false;
  private stopped_ = true;

  private time_out_event_: BindableEvent = new Instance("BindableEvent");
  readonly on_time_out_: RBXScriptSignal = this.time_out_event_.Event;

  private update_connection_?: RBXScriptConnection

  private callback_: FrameTimerCallback = () => { }
  private stepping_event_: RBXScriptSignal<(delta_time: number) => void> = RunService.Heartbeat;

  /**
   * @param time_passed time passed since the start of the timer
   */
  SetCallback(callback: FrameTimerCallback) {
    this.callback_ = callback;
    return this;
  }

  SetSteppingEvent(stepping_event: RBXScriptSignal<(delta_time: number) => void>) {
    this.stepping_event_ = stepping_event;
    return this;
  }

  Start(time_sec = -1) {
    if (time_sec > 0) {
      this.wait_time_ = time_sec;
    }
    //stops the existing timer
    this.Stop();

    this.time_left_ = this.wait_time_;
    //saves the time to calculate time passed
    this.initialized_wait_time_ = this.wait_time_;

    //takes stopped flag away
    this.stopped_ = false;
    this.update_connection_ = this.stepping_event_.Connect(delta_time => this.Update(delta_time));

    return this;
  }

  Await(ignore_if_stopped: boolean = true) {
    if (ignore_if_stopped && this.stopped_) return this;
    this.on_time_out_.Wait();
    return this;
  }

  private Update(delta_time: number) {
    //dont update if paused
    if (this.paused_) return;

    this.time_left_ -= delta_time;
    //clamps to wait time
    const time_passed = math.min(this.initialized_wait_time_ - this.time_left_, this.wait_time_);
    this.callback_(time_passed, delta_time);
    if (this.time_left_ > 0) return

    this.time_out_event_.Fire();

    if (!this.one_shot_) {
      //restarts the time if not oneshot
      this.time_left_ = this.wait_time_;
      return;
    }

    //stops if one shot
    this.Stop();
  }

  Stop() {
    if (this.stopped_) return;

    //clamps the time
    this.time_left_ = max(this.time_left_, 0);
    this.update_connection_?.Disconnect();
    this.paused_ = false;
    this.stopped_ = true;

    return this;
  }
  IsStopped() {
    return this.stopped_;
  }

  GetTimeLeft() {
    return this.time_left_;
  }

  Destroy() {
    this.Stop();
    this.time_out_event_.Destroy();
  }
}