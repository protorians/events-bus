export enum EventBusEnum {
    LOG = 'log',
    LOG_ERROR = 'log.error',
    LOG_INFO = 'log.info',
    LOG_WARNING = 'log.warning',
    LOG_DEBUG = 'log.debug',
    LOG_CRITICAL = 'log.critical',
    LOG_EMERGENCY = 'log.emergency',
    LOG_NOTICE = 'log.notice',
    LOG_TRACE = 'log.trace',
    LOG_SILENT = 'log.silent',

    SERVER_STARTED = 'server:started',
    SERVER_STOPPED = 'server:stopped',
    SERVER_SHUTDOWN = 'server:shutdown',
    SERVER_ERROR = 'server:error',
    SERVER_WARNING = 'server:warning',
    SERVER_CRITICAL = 'server:critical',
    SERVER_DEBUG = 'server:debug',
    SERVER_THROW = 'server:throw',

    USER_CREATED = 'user:created',
    USER_UPDATED = 'user:updated',
    USER_DELETED = 'user:deleted',

    CAPABILITY_CREATED = 'capability:created',
    CAPABILITY_UPDATED = 'capability:updated',
    CAPABILITY_DELETED = 'capability:deleted',
    CAPABILITY_ASSIGNED = 'capability:assigned',
    CAPABILITY_UNASSIGNED = 'capability:unassigned',
    CAPABILITY_OPENED = 'capability:opened',
    CAPABILITY_CLOSED = 'capability:closed',

    ROLE_CREATED = 'role:created',
    ROLE_UPDATED = 'role:updated',
    ROLE_DELETED = 'role:deleted',

    PERMISSION_CREATED = 'permission:created',
    PERMISSION_UPDATED = 'permission:updated',
    PERMISSION_DELETED = 'permission:deleted',

    ROUTE_OPENED = 'route:opened',
    ROUTE_CLOSED = 'route:closed',
}
