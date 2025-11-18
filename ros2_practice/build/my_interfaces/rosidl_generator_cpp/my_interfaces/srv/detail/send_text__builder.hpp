// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from my_interfaces:srv/SendText.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "my_interfaces/srv/send_text.hpp"


#ifndef MY_INTERFACES__SRV__DETAIL__SEND_TEXT__BUILDER_HPP_
#define MY_INTERFACES__SRV__DETAIL__SEND_TEXT__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "my_interfaces/srv/detail/send_text__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace my_interfaces
{

namespace srv
{

namespace builder
{

class Init_SendText_Request_text
{
public:
  Init_SendText_Request_text()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::my_interfaces::srv::SendText_Request text(::my_interfaces::srv::SendText_Request::_text_type arg)
  {
    msg_.text = std::move(arg);
    return std::move(msg_);
  }

private:
  ::my_interfaces::srv::SendText_Request msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::my_interfaces::srv::SendText_Request>()
{
  return my_interfaces::srv::builder::Init_SendText_Request_text();
}

}  // namespace my_interfaces


namespace my_interfaces
{

namespace srv
{

namespace builder
{

class Init_SendText_Response_response
{
public:
  Init_SendText_Response_response()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::my_interfaces::srv::SendText_Response response(::my_interfaces::srv::SendText_Response::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::my_interfaces::srv::SendText_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::my_interfaces::srv::SendText_Response>()
{
  return my_interfaces::srv::builder::Init_SendText_Response_response();
}

}  // namespace my_interfaces


namespace my_interfaces
{

namespace srv
{

namespace builder
{

class Init_SendText_Event_response
{
public:
  explicit Init_SendText_Event_response(::my_interfaces::srv::SendText_Event & msg)
  : msg_(msg)
  {}
  ::my_interfaces::srv::SendText_Event response(::my_interfaces::srv::SendText_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::my_interfaces::srv::SendText_Event msg_;
};

class Init_SendText_Event_request
{
public:
  explicit Init_SendText_Event_request(::my_interfaces::srv::SendText_Event & msg)
  : msg_(msg)
  {}
  Init_SendText_Event_response request(::my_interfaces::srv::SendText_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_SendText_Event_response(msg_);
  }

private:
  ::my_interfaces::srv::SendText_Event msg_;
};

class Init_SendText_Event_info
{
public:
  Init_SendText_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_SendText_Event_request info(::my_interfaces::srv::SendText_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_SendText_Event_request(msg_);
  }

private:
  ::my_interfaces::srv::SendText_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::my_interfaces::srv::SendText_Event>()
{
  return my_interfaces::srv::builder::Init_SendText_Event_info();
}

}  // namespace my_interfaces

#endif  // MY_INTERFACES__SRV__DETAIL__SEND_TEXT__BUILDER_HPP_
