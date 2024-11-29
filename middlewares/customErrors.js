// 通过继承 Error 类，你可以确保你的自定义错误对象具有以下特性：

// 堆栈跟踪 (stack): 自动包含错误发生的位置信息，这对于调试非常有用。
// 消息 (message): 包含错误的描述信息。
// 实例检查: 可以使用 instanceof 操作符来检查某个对象是否是特定类型的错误。

// 常见错误类型
class ParameterMissingError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ParameterMissingError'
        this.statusCode = 400
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
        this.statusCode = 400
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AuthorizationError'
        this.statusCode = 401
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = 404
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message)
        this.name = 'DatabaseError'
        this.statusCode = 500
    }
}

module.exports = {
    ParameterMissingError,
    ValidationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError
}