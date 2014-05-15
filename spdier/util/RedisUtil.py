#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Author: @wh1100717
因为redis-py有一些功能没实现，比如一次存储数组到redis中等
并且一些名称不是特别适合记忆，就自己做了一层封装。
没有太多时间，挑选了一些常用的操作进行封装。
具体的可以内容可以查看下面的注释。
'''

import redis
import UtilConfig

REDIS = UtilConfig.REDIS
pool = redis.ConnectionPool(
    host=REDIS['host'], password=REDIS['password'], port=REDIS['port'], db=REDIS['db'])

'''
Redis介绍:
Redis 是完全开源免费的，遵守BSD协议，先进的key-value持久化产品。
它通常被称为数据结构服务器，因为值（value）可以是 字符串(String), 哈希(Map), 列表(list), 集合(sets)和有序集合(sorted sets)等类型。

本接口中定义了以下约定:
key: redis中数据的标识符(key-value)
value: redis中数据的值/哈希数据类型中的值(key-value) | (key-map_key-value)
map_key: redis中哈西类型数据的键(key-map_key-value)
member: redis中set类型数据的值(key-member)

String类型的操作不加前缀，例如set, get, delte, incr
List类型的操作不增加前缀，主要通过item, list来区分，例如push_items, poush_list, pop_item
Set类型的操作增加前缀`s`，例如sset, sget
Sorted_set类型的操作增加前缀`sorted_s`，例如sorted_sset
Hashes类型的操作增加前缀`h`，例如hset, hget
'''


class RedisClient(object):

    def __init__(self):
        self.redis_client = redis.Redis(connection_pool=pool)

    '''
    Common Operation:
        * 
		* get_items(key, start, end, type): 
			返回列表中start起始，end结束的元素。
			type可选值为`list` | `sorted_set`
		* get_length(key,type): 
			获取队列的长度
			type可选值为`list` | `set` | `hash`
        * delete(key1,key2,key3,...): 
            删除key及所对应的数据。如果删除的key不存在，则直接忽略。
        * exists(key):
            返回key是否存在
        * rename(key, new_key):
            将key重命名为newkey
            如果key与newkey相同，将返回一个错误
            如果newkey已经存在，则值将被覆盖。
        * type(key):
            返回 key 所储存的值的类型。
            none (key不存在)
            string (字符串)
            list (列表)
            set (集合)
            zset (有序集)
            hash (哈希表)
        * keys(pattern)
            返回符合pattern的keys

   Unimplement:
        dump | restore | expire | expireat | migrate | move | object | persist |
        pexpire | pexpireat | pttl | randomkey | renamenx | ttl | sort | scan
	'''

    def get_items(self, redis_key, start, end, redis_type='list'):
        '''
        redis_type
                list: 返回数组的items
                sorted_set: 返回有序set的items
        '''
        if redis_type == 'list':
            return self.redis_client.lrange(redis_key, start, end)
        elif redis_type == 'sorted_set':
            return self.redis_client.zrange(redis_key, start, end)

    def get_length(self, redis_key, redis_type='list'):
        if redis_type == 'list':
            return self.redis_client.llen(redis_key)
        elif redis_type == 'set':
            return self.redis_client.scard(redis_key)
        elif redis_type == 'hash':
            return self.redis_client.hlen(redis_key)

    def delete(self, *redis_key):
        code = self.redis_client.delete(*redis_key)
        return True if code else False

    def exists(self, redis_key):
        return self.redis_client.exists(redis_key)

    def rename(self, redis_key, redis_new_key):
        return self.redis_client.rename(redis_key, redis_new_key)

    def type(self, redis_key):
        return self.redis_client.type(redis_key)

    def keys(self, pattern = '*'):
        return self.redis_client.keys(pattern)

    '''
	Key-value操作:
		* set(key,value): 
			将key和value对应。如果key已经存在了，它会被覆盖，F而不管它是什么类型。
		* mset(key1,value1,key2,value2,key3=value3,....): 
			一次性赋值set多个key-value, 如果已存在，则会覆盖。
		* set_range(key,offset,value): 
			这个命令的作用是覆盖key对应的string的一部分，从指定的offset处开始，覆盖value的长度。
			如果offset比当前key对应string还要长，那这个string后面就补0以达到offset。
			不存在的keys被认为是空字符串，所以这个命令可以确保key有一个足够大的字符串，能在offset处设置value。
		* get(key): 
			返回key的value。如果key不存在，返回特殊值nil。如果key的value不是string，就返回错误，因为GET只处理string类型的values
		* gets(keys): 
			返回给定key的value，key可以输入多个，例如gets(key1,key2,key3.....)
		* get_range(key,start, end): 
			获取存储在key上的值的一个子字符串
		* append(key, value): 
			如果key已经存在，并且值为字符串，那么这个命令会把value追加到原来值（value）的结尾。 
			如果 key 不存在，那么它将首先创建一个空字符串的key，再执行追加操作，这种情况 APPEND 将类似于 SET 操作。
		* incr(key,amount): 
			对key对应的数字做加1操作。
			如果key不存在，那么在操作之前，这个key对应的值会被置为0。
			如果key有一个错误类型的value或者是一个不能表示成数字的字符串，就返回错误。
			注: amount可以为负值。
	Unimplement:
		getbit | setex | bitcount | setnx | bitop | getset | msetnx | incrbyfloat
	'''

    def set(self, redis_key, redis_value):
        return self.redis_client.set(redis_key, redis_value)

    def mset(self, *args, **kwargs):
        if len(args) % 2 != 0:
            return False
        paras = []
        paras.extend(args)
        for key in kwargs:
            paras.append(kwargs[key])
            paras.append(key)
        return self.redis_client.mset(*paras)

    def set_range(self, redis_key, offset, redis_value):
        return self.redis_client.set_range(redis_key, offset, redis_value)

    def get(self, redis_key):
        return self.redis_client.get(redis_key)

    def gets(self, *redis_key):
        return self.redis_client.mget(*redis_key)

    def get_range(self, redis_key, start, end):
        return self.redis_client.getrange(redis_key, start, end)

    def append(self, redis_key, redis_value):
        return self.redis_client.append(redis_key, redis_value)

    def incr(self, redis_key, amount=1):
        if amount < 0:
            return self.redis_client.decr(redis_key, abs(amount))
        else:
            return self.redis_client.incr(redis_key, amount)

    '''
	List操作:
		* get_item(key,index): 
			返回列表里index位置存储值。
			下标是从0开始索引的，所以0是表示第一个元素，1表示第二个元素，并以此类推。
			负数索引用于指定从列表尾部开始索引的元素。
			在这种方法下，-1表示最后一个元素，-2表示倒数第二个元素，并以此往前推。
        * get_items_with_index_list(key, list_of_index):
            返回List，list中包含列表里index位置存储值。
		* insert_item(key,refvalue,value,where): 
			把value插入存于key的列表中在基准值refvalue的前面或后面。
			where为'before'或'after', 默认为'after'
		* set_item(key,index,value):
			设置index位置的list元素的值为value。
			当index超出范围时会返回一个error。
		* push_items(key,value1,value2,...): 
			向存于key的列表的尾部插入所有指定的值。
			如果key不存在，那么会创建一个空的列表然后再进行push操作。
			当 key 保存的不是一个列表，那么会返回一个错误。
		* lpush_items(key,value1,value2,...): 
			将所有指定的值插入到存于 key 的列表的头部。
			如果 key 不存在，那么在进行 push 操作前会创建一个空列表。 如果 key 对应的值不是一个 list 的话，那么会返回一个错误。
		* push_list(key,list): 
			同push_items，参数为list
		* lpush_list(key,list): 
			同lpush_items，参数为list
		* pop_item(key):
			移除并返回存于 key 的 list 的最后一个元素。
		* lpop_item(key): 
			移除并且返回key对应的 list 的第一个元素。
		* remove_item(key,value,count): 
			从存于key的列表里移除前count次出现的值为value的元素。 这个count参数通过下面几种方式影响这个操作：
			count > 0: 从头往尾移除值为 value 的元素。
			count < 0: 从尾往头移除值为 value 的元素。
			count = 0: 移除所有值为 value 的元素。
			count默认为1
			比如， LREM list -2 "hello" 会从存于 list 的列表里移除最后两个出现的 "hello"。
			需要注意的是，如果list里没有存在key就会被当作空list处理，所以当 key 不存在的时候，这个命令会返回 0。
	Unimplement:
		blpop | brpop | brpoplpush | lpushx | ltrim | rpoplpush
	'''

    def get_item(self, redis_key, redis_index):
        return self.redis_client.lindex(redis_key, redis_index)

    def get_items_with_index_list(self, redis_key, redis_index_list):
        pipe = self.redis_client.pipeline()
        for redis_index in redis_index_list:
            pipe.lindex(redis_key, redis_index)
        return pipe.execute()
  
    def insert_item(self, redis_key, refvalue, redis_value, where='after'):
        return self.redis_client.linsert(redis_key, where, refvalue, redis_value)

    def set_item(self, redis_key, redis_index, redis_value):
        return self.redis_client.lset(redis_key, redis_index, redis_value)

    def push_items(self, redis_key, *redis_values):
        return self.redis_client.rpush(redis_key, *redis_values)

    def lpush_items(self, redis_key, *redis_values):
        return self.redis_client.lpush(redis_key, *redis_values)

    def push_list(self, redis_key, redis_list):
        return self.redis_client.rpush(redis_key, *redis_list)

    def lpush_list(self, redis_key, redis_list):
        return self.redis_client.lpush(redis_key, *redis_list)

    def pop_item(self, redis_key):
        return self.redis_client.rpop(redis_key)

    def lpop_item(self, redis_key):
        return self.redis_client.lpop(redis_key)

    def remove_item(self, redis_key, redis_value, count=1):
        return self.redis_client.lrem(redis_key, count, redis_value)

    '''
	Set操作:
		* sset(key,member1,member2,...):
			添加一个或多个指定的member元素到集合的key中.
			指定的一个或者多个元素member如果已经在集合key中存在则忽略.
			如果集合key不存在，则新建集合key,并添加member元素到集合key中.
			如果key的类型不是集合则返回错误.
		* sdiff(key1,key2,key3,...):
			key1的集合与(key2,key3,...)的集合的补集，即A-B={x|x∈A，x∉B'}
		* sinter(key1,key2,key3,...)
			key1的集合与(key2,key3,...)的集合的交集，即A∩B={x|x∈A,且x∈B}
		* sunion(key1,key2,key3,...):
			key1的集合与(key2,key3,...)的集合的并集，即即A∪B={x|x∈A,或x∈B}
		* sexist(key, member):
			检查member是否在当前结合中
		* sget_all(key):
			获取当前key下的集合所有元素
		* smove(src, dst, member):
			将member从src集合移动到dst集合中.
			如果src集合不存在或者不包含指定的元素,这smove命令不执行任何操作并且返回0
			否则对象将会从src集合中移除，并添加到dst集合中去
			如果dst集合已经存在该元素，则smove命令仅将该元素充src集合中移除
			如果src或dst不是集合类型，则返回错误
		* spop(key):
			从集合中随机移除并返回一个元素
		* srandmember(key, number):
			仅提供key参数，那么随机返回key集合中的一个元素.
			Redis2.6开始，可以接受number参数
			如果number是整数且小于元素的个数,则返回含有number个不同的随机元素的数组
			如果number是个整数且大于集合中元素的个数时,仅返回整个集合的所有元素
			当number是负数,则会返回一个包含number的绝对值的个数元素的数组
			如果number的绝对值大于元素的个数,则返回的结果集里会出现一个元素出现多次的情况
			仅提供key参数时,该命令作用类似于SPOP命令, 不同的是SPOP命令会将被选择的随机元素从集合中移除, 
			而SRANDMEMBER仅仅是返回该随记元素,而不做任何操作.
		* sdelete(key, member1, member2):
			在key集合中移除指定的元素
			如果指定的元素不是key集合中的元素则忽略
			如果key集合不存在则被视为一个空的集合，该命令返回0.
			如果key的类型不是一个集合,则返回错误.
	Unimplement:
		sdiffstore | sinterstore | smove | sunionstore | sscan

	'''

    def sset(self, redis_key, *redis_members):
        return self.redis_client.sadd(redis_key, *redis_members)

    def sdiff(self, redis_key, *args):
        return self.redis_client.sdiff(redis_key, *args)

    def sinter(self, redis_key, *args):
        return self.redis_client.sinter(redis_key, *args)

    def sunion(self, redis_key, *args):
        return self.redis_client.sunion(redis_key_1, redis_key_2)

    def sexist(self, redis_key, redis_member):
        return self.redis_client.sismember(redis_key, redis_member)

    def sget_all(self, redis_key):
        return self.redis_client.smembers(redis_key)

    def smove(self, src, dst, redis_member):
        return self.redis_client.smove(src, dst, redis_member)

    def spop(self, redis_key):
        return self.redis_client.spop(redis_key)

    def srandmember(self, redis_key, number=None):
        return self.redis_client.srandmember(redis_key, number)

    def sdelete(self, redis_key, *redis_member):
        return self.redis_client.srem(redis_key, *redis_member)

    '''
    Sorted-Set操作:
        sorted_sset(key, index1, member1, index2, memeber2,...):
            添加指定的成员到key对应的有序集合中，每个成员都有一个index
            如果一个指定的成员已经在对应的有序集合中了，那么其分数就会被更新成最新的，并且该成员会重新调整到正确的位置，以确保集合有序
            如果key不存在，就会创建一个含有这些成员的有序集合，就好像往一个空的集合中添加一样
            如果key存在，但是它并不是一个有序集合，那么就返回一个错误
            分数的值必须是一个表示数字的字符串，并且可以是double类型的浮点数。
    Unimplement:
        有序集合目前没有相应需求，暂时不提供Redis_client接口
        ZCARD | ZCOUNT | ZINCRBY | ZINTERSTORE | ZRANGE | ZRANGEBYSCORE | ZRANK | ZREM | ZREMRANGEBYRANK | ZREMRANGEBYSCORE |
        ZREVRANGE | ZREVRANGEBYSCORE | ZREVRANK | ZSCORE | ZUNIONSTORE | ZSCAN
    '''
    def soreted_sset(self, redis_key, *args, **kwargs):
        '''
        输入格式为
            1. redis_key, redis_index1(float), redis_member1, redis_index2, redis_member2....
            2. redis_key, redis_member1 = redis_index1, redis_member2 = redis_index2....
        '''
        if len(args) % 2 != 0:
            return False
        paras = []
        paras.extend(args)
        for key in kwargs:
            paras.append(kwargs[key])
            paras.append(key)
        return self.redis_client.zadd(redis_key, *paras)

    '''
	Hashes(可以理解成map或者字典)操作:
        hset(key, map_key1, value1, map_key2 = value2, map_key3, value3):
            设置key指定的哈希集中指定字段map_key的值value
            如果key指定的哈希集不存在，会创建一个新的哈希集并与 key 关联
            如果字段map_key在哈希集中存在，value将被覆盖。
        hset_map(key,dictionary):
            用法与hset相同，区别在于输入参数为map，可以直接将一个map类型传入进去。
        hdelete(key,map_key1,map_key2,...):
            从key指定的哈希集中移除指定的域
            在哈希集中不存在的域将被忽略
            如果key指定的哈希集不存在，它将被认为是一个空的哈希集，该命令将返回0。
        hexists(key,map_key):
            返回字段map_key是否是key指定的哈希集中存在的字段。
        hget(key,map_key):
            返回key指定的哈希集中map_key该字段所关联的值
        hget_all(key):
            返回key指定的哈希集中所有的字段和值
        hincr(key,map_key,amount):
            增加key指定的哈希集中指定字段map_key的数值
            如果key不存在，会创建一个新的哈希集并与 key 关联
            如果字段不存在，则字段的值在该操作执行前被设置为0
        hincr_float(key,map_key,float_amount):
            同hincr()，amount为浮点数
        hkeys(key):
            获取key指定的哈希集中所有字段
        hlen(key):
            获取key制定的哈希集中字段的长度
        hvals(key):
            返回key指定的哈希集中所有字段的值
    Unimplement:
        hmget | hsetnx

	'''

    def hset(self, redis_key, *args, **kwargs):
        '''
        输入格式为:
            1. redis_key, redis_map_key1, redis_value1, redis_map_key2, redis_value2....
            2. redis_key, redis_map_key1 = redis_value1, redis_map_key2 = redis_value2....
        '''        
        if len(args) % 2 != 0:
            return False
        paras = []
        paras.extend(args)
        for key in kwargs:
            paras.append(key)
            paras.append(kwargs[key])
        pipe = self.redis_client.pipeline()
        for i in range(len(paras) / 2):
            pipe.hset(redis_key, paras[2 * i], paras[2 * i + 1])
        code = pipe.execute()
        return True if code else False

    def hset_map(self, redis_key, dictionary):
        pipe = self.redis_client.pipeline()
        for map_key in dictionary:
            pipe.hset(redis_key, map_key, dictionary[map_key])
        code = pipe.execute()
        return True if code else False

    def hdelete(self, redis_key, *redis_map_keys):
        return self.redis_client.hdel(redis_key, *redis_map_keys)

    def hexists(self, redis_key, redis_map_key):
        return self.redis_client.hexists(redis_key, redis_map_key)

    def hget(self, redis_key, redis_map_key):
        return self.redis_client.hget(redis_key, redis_map_key)

    def hget_all(self, redis_key):
        return self.redis_client.hgetall(redis_key)

    def hincr(self, redis_key, redis_map_key, amount=1):
        return self.redis_client.hincrby(redis_key, redis_map_key, amount)

    def hincr_float(self, redis_key, redis_map_key, float_amount = 1.0):
        return self.redis_client.hincrbyfloat(redis_key, redis_map_key, float_amount)

    def hkeys(self, redis_key):
        return self.redis_client.hkeys(redis_key)

    def hlen(self, redis_key):
        return self.redis_client.hlen(redis_key)

    def hvals(self, redis_key):
        return self.redis_client.hvals(redis_key)


    '''
    other unimplement commands:
        pub/sub:
            psubscribe | pubsub | publish | punsubscribe | subscribe | unsubscribe
        transaction:
            discard | exec | multi | unwatch | watch
        scripting:
            eval | evalsha | script_exists | script_flush | script_kill | script_load
        connection:
            auth | echo | ping | quit | select
        server：
            bgrewriteaof | bgsave | client kill | client list | client getname | client setname | config get |
            config rewrite | config set | config resetstat | dbsize | debug object | debug segfault | flushall |
            flushdb | info | lastsave | monitor | save | shutdown | slaveof | slowlog | sync | time
    '''


# redis = RedisClient()
# url = redis.spop('url_set')
# print url


