/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   1874.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 09:34:18 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 11:36:36 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

char result[200000] = "";
int  arr[100000] = {0};
typedef struct s_node
{
	int data;
	struct s_node *next;
}				t_node;

typedef struct s_stack
{
	int	size;
	t_node *top;
}				t_stack;

void	push(t_stack *stack, int data)
{
	t_node	*new;
	
	if (!(new = malloc(sizeof(t_node))))
		return ;
	new->data = data;
	new->next = stack->top;
	stack->top = new;
	stack->size++;
}

void	pop(t_stack *stack)
{
	t_node *prev;

	if (stack == NULL || stack->top == NULL)
		return ;
	prev = stack->top;
	stack->top = prev->next;
	free(prev);
	stack->size--;
}

t_stack *initStk(void)
{
	t_stack *stack;

	if (!(stack = malloc(sizeof(t_stack))))
		return (NULL);
	stack->top = NULL;
	return (stack);
}

int		isEmpty(t_stack *stack)
{
	if (stack->size == 0)
		return (0);
	return (1);
}

void	stack_clear(t_stack *stack)
{
	while(stack->top)
		pop(stack);
	free(stack);
	return ;

}
int			peek(t_stack *stack)
{
	if (stack == NULL || stack->size == 0)
		return (0);
	return (stack->top->data);
}

int main(void)
{
	t_stack *stack;
	int n;
	int	resIdx;
	int idx;
	int stkIdx;

	scanf("%d", &n);
	if (n == 0)
	{
		printf("NO");
		return (0);
	}
	resIdx = 0;
	stack = initStk();
	idx = 0;
	stkIdx = 2;
	for(int i = 0; i < n; i++)
		scanf("%d", arr + i);
	push(stack, 0);
	push(stack, 1);
	result[resIdx++] = '+';
	while(arr[idx] && idx != n)
	{
		if (peek(stack) < arr[idx])
		{
			result[resIdx++] = '+';
			push(stack, stkIdx++);
			result[resIdx] = '\0';
		}
		else if (peek(stack) == arr[idx])
		{
			result[resIdx++] = '-';
			result[resIdx] = '\0';
			pop(stack);
			idx++;
		}
		else if (peek(stack) == 0)
		{
			result[resIdx++] = '+';
			result[resIdx] = '\0';
			push(stack, stkIdx++);
		}
		if (arr[idx] < peek(stack))
			break ;
	}
	if (idx != n)
		printf("NO");
	else
	{
		for (int i = 0; i < resIdx; i++)
			printf("%c\n",result[i]);
	}
	stack_clear(stack);
	return (0);
}
